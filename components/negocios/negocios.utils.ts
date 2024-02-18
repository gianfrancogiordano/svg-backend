import { CustomError } from "../../classes/custom-error";
import { dataTablePaginado } from "../../helpers/dataTable";
import { Negocio } from "../../models/negocio.model";
import { Usuario } from "../../models/usuario.model";

export const findAllNegocios = async (filtro: string, pagina: number, porPagina: number) => {

  const regex = new RegExp(filtro, 'i');
  let pag = pagina;
  pag = pag - 1;
  let desde = pag * porPagina;

  if (desde < 0) { desde = 0; }

  let sWhere: any = {}

  if (filtro !== '') {
    sWhere = {
      nombre_comercial: regex,
    }
  }

  // Actualizamos la informacion de los dias restantes -> FECHAS
  // await actualizarDiasRestantes();

  const [negocios, conteo] = await Promise.all([

    Negocio.find(sWhere)
      .sort({ 'last_suscription_end': 1 })
      .skip(desde)
      .limit(porPagina),

    Negocio.countDocuments(sWhere),

  ]);

  return dataTablePaginado(negocios, conteo, pagina, porPagina);

};

export const findOneNegocio = async (idNegocio: string) => {

  const [negocio, usuarios] = await Promise.all([

    Negocio.findById(idNegocio)
      .populate('sedes.encargado'),

    Usuario.find({ negocio: idNegocio }, 'nombre user email _id'),

  ]);

  if (!negocio)
    throw new CustomError('negocio no encontrado en BD', 400, 'negocio no encontrado en BD');

  return { negocio, usuarios };

}

export const validarUsuario = async () => {
  return await Usuario.find({}, 'user');
}

export const validarIdentificador = async () => {
  return await Negocio.find({}, 'identnegocio');
}
