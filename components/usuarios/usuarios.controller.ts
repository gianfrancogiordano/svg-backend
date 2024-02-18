import { Request, Response } from 'express';
import { success } from '../../routes/response';
import { createUser, findAllUser, findOneUser, findUserAndResetPassword, updateUser } from './usuarios.utils';
import { errorHandler } from '../../helpers/errorHandler';

export const getUsuarios = async( req: any, res: Response ) => {
    try { success(req, res, await findAllUser(req.unegocio, req.query.filtro, req.query.pagina || 1, req.query.porPagina || 5)); }
    catch (err) { errorHandler(req, res, err); }
};

export const getUsuario = async(req: Request, res: Response) => {
    try { success(req, res, await findOneUser(req.params.id)); }
    catch (err) { errorHandler(req, res, err); }
};

export const nuevoUsuario = async(req: Request, res: Response) => {
    try { success(req, res, await createUser(req.body)); }
    catch (err) { errorHandler(req, res, err); }
};

export const resetPassword = async(req: Request, res: Response) => {
    try { success(req, res, await findUserAndResetPassword(req.body.email, req.body.user, req.body.newpassword)); }
    catch (err) { errorHandler(req, res, err); }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
    try { success(req, res, await updateUser(req.params.id, req.body)); }
    catch (err) { errorHandler(req, res, err); }
};

