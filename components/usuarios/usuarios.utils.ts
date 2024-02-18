import { genSaltSync, hashSync } from "bcryptjs";
import { CustomError } from "../../classes/custom-error";
import { dataTablePaginado } from "../../helpers/dataTable";
import { Usuario } from "../../models/usuario.model";

export const findAllUser = async (negocio: string, filtro: string, pagina: number, porPagina: number) => {

    try {

        const regex = new RegExp(filtro, 'i');

        let pag = +pagina;
        pag = pag - 1;
        let desde = pag * +porPagina;
        if (desde < 0) { desde = 0; }

        let sWhere: any = { negocio };

        if (filtro != '') {
            sWhere = { negocio, nombre: regex, }
        }

        // Ejecutamos las dos peticiones simultaneamente
        const [usuarios, conteo]: any = await Promise.all([

            Usuario.find(sWhere, 'nombre user email activo role negocio _id')
                .skip(desde)
                .limit(+porPagina),

            Usuario.countDocuments(sWhere)

        ]);

        return dataTablePaginado(usuarios, conteo, +pagina, +porPagina);

    } catch (err) {
        throw new CustomError('Error obteniendo usuarios', 400, 'Error obteniendo usuarios' + err);
    }

}

export const findOneUser = async (id: string) => {

    const usuarioBD = await Usuario.findById(id);

    if (!usuarioBD) {
        throw new CustomError('El usuario no fue encontrado en BD', 400, 'El usuario no fue encontrado en BD');
    }

    // Eliminamos el password
    if (usuarioBD?.password != null) {
        usuarioBD.password = '';
    }

    return usuarioBD;

}

export const createUser = async (data: any) => {

    const { user, password, nombre, email, role, negocio } = data;

    const existeUser = await Usuario.findOne({ user });

    if (existeUser) {
        throw new CustomError(`El usuario: '${user}' ya está en uso`, 400, 'Ese usuario ya está en uso');
    }

    const usuario = new Usuario({ user, nombre, password, email, role, negocio });

    // Encriptar contraseña
    const salt = genSaltSync();
    usuario.password = hashSync(password, salt);

    // Guardamos el usuario
    await usuario.save();

    return usuario;

};

export const updateUser = async (uid: string, campos: any) => {

    // Buscamos el usuario en la base de datos
    await findOneUser(uid);

    if (campos.password) {
        // Encriptar contraseña
        const salt = genSaltSync();
        campos.password = hashSync(campos.password, salt);
    }

    // Actualizamos el usuario
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

    // Eliminamos el password
    if (usuarioActualizado?.password != null) {
        usuarioActualizado.password = '';
    }

    return usuarioActualizado;

}

export const findOneUserAndDelete = async (id: string) => {

    const usuarioDB = await Usuario.findByIdAndDelete(id);

    if (!usuarioDB)
        throw new CustomError('El usuario no fue encontrado en BD', 400, 'El usuario no fue encontrado en BD');

    return usuarioDB;

}

export const findUserAndResetPassword = async (email: string, usuario: string, newPassword: string) => {

    const usuarioDB: any = await Usuario.findOne({ email }); // El email del usuario registrado

    if (!usuarioDB) {
        throw new CustomError(`Comunicate con el administrador para cambio de clave`, 400, 'email no encontrado en DB para cambio de clave');
    }

    if (usuarioDB.user !== usuario) {
        throw new CustomError(`Comunicate con el administrador para cambio de clave`, 400, 'El usuario no es igual al de DB para cambio de clave');
    }

    usuarioDB.password = newPassword;
    await updateUser(usuarioDB._id, usuarioDB);
    return 'ok';

}