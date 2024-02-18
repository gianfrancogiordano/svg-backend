import { Response } from 'express';
import { success } from '../../routes/response';
import { stockAlarm, ventasGrafico } from './dashboard.utils';
import { errorHandler } from '../../helpers/errorHandler';

export const getVentasGrafico = async (req: any, res: Response) => {
  try { success(req, res, await ventasGrafico(req.unegocio._id, req.query.desde, req.query.hasta)); }
  catch (err) { errorHandler(req, res, err); }
}

export const getStockAlarm = async (req: any, res: Response) => {
  try { success(req, res, await stockAlarm(req.unegocio._id, Number(req.query.pagina) || 1, Number(req.query.porPagina) || 5)); }
  catch (err) { errorHandler(req, res, err); }
}
