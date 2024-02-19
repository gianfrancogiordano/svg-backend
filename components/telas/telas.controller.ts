import { Request, Response } from "express";
import { errorHandler } from "../../helpers/errorHandler";
import { success } from "../../routes/response";
import { createNewTela, deleteOneTela, getAllTelas, getOneTela, updateOneTela } from "./telas.utils";

export const getTelas = async (req: any, res: Response) => {
    try { success(req, res, await getAllTelas(req.query.desde, req.query.hasta, req.unegocio._id, req.query.filtro || '', Number(req.query.pagina) || 1, Number(req.query.porPagina))); }
    catch (err) { errorHandler(req, res, err); }
};

export const getTela = async (req: Request, res: Response) => {
    try { success(req, res, await getOneTela(req.params.id)); }
    catch (err) { errorHandler(req, res, err); }
};

export const createTela = async (req: Request, res: Response) => {
    try { success(req, res, await createNewTela(req.body)); }
    catch (err) { errorHandler(req, res, err); }
};

export const updateTela = async (req: Request, res: Response) => {
    try { success(req, res, await updateOneTela(req.params.id || '', req.body)); }
    catch (err) { errorHandler(req, res, err); }
};

export const deleteTela = async (req: Request, res: Response) => {
    try { success(req, res, await deleteOneTela(req.params.id || '')); }
    catch (err) { errorHandler(req, res, err); }
};