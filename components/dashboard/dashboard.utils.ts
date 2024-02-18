import { Types } from "mongoose";
import { CustomError } from "../../classes/custom-error";

export const ventasGrafico = async (negocio: string, fechaDesde: string, fechaHasta: string) => {

  try {

    return 'ok'

  } catch (err) {
    throw new CustomError('Error construyendo grafico de ventas', 400, 'Error construyendo grafico de ventas' + err);
  }

}

export const stockAlarm = async (negocio: string, pagina: number, porPagina: number) => {

  // traer todos los productos que alarma stock sea mayor o igual al stock de ese negocio
  try {

    return 'ok'

  } catch (err) {
    throw new CustomError('Error al buscar productos con bajo stock', 400, 'Error al buscar productos con bajo stock' + err);
  }

}
