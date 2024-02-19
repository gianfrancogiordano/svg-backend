
import { CustomError } from "../../classes/custom-error";
import { dataTablePaginado } from "../../helpers/dataTable";
import { Tela } from "../../models/tela.model";

export const getAllTelas = async (fechaDesde: string, fechaHasta: string, negocio: string, filtro: string, pagina: number, porPagina: number) => {

    const regex = new RegExp(filtro, 'i');
    let sort = -1;
    let pag = pagina;
    pag = pag - 1;
    let desde = pag * porPagina;
    if (desde < 0) { desde = 0; }

    let sWhere: any = { };

    if (filtro !== '') {
        sWhere = { 'descripcion': regex }
    }

    const [telas, conteo] = await Promise.all([

        Tela.find(sWhere)
            .populate('usuario')
            .sort({ 'createdAt': sort })
            .skip(desde)
            .limit(porPagina),

        Tela.countDocuments(sWhere)

    ]);

    return dataTablePaginado(telas, conteo, pagina, porPagina);

}

export const getOneTela = async (id: string) => {

    const tela = await Tela.findById(id);

    if (!tela)
        throw new CustomError('Tela no encontrado en BD', 400, 'Tela no encontrado en BD');

    return tela;

}

export const createNewTela = async (data: any) => {

    try {

        // Creamos la tela
        const tela = new Tela(data);

        // Guardamos en BD
        await tela.save();

        return tela;

    } catch (err) {
        throw new CustomError('Internal Server Error', 500, 'Internal Server Error: ' + err);

    }

}

export const updateOneTela = async (id: string, campos: any) => {

    // Buscamos la tela en la base de datos
    const telaDB = await Tela.findById(id);

    if (!telaDB)
        throw new CustomError('Tela no encontrado en BD', 400, 'Tela no encontrado en BD');

    const telaActualizada = await Tela.findByIdAndUpdate(id, campos, { new: true });

    return telaActualizada;

}

export const deleteOneTela = async (id: string) => {

    // Buscamos la tela y la eliminamos
    const telaDB = await Tela.findByIdAndDelete(id);

    if (!telaDB)
        throw new CustomError('Tela no encontrado en BD', 400, 'Tela no encontrado en BD');

    return telaDB;

}

