import { Request, Response } from 'express';
import { Negocio } from '../../models/negocio.model';
import { success, error } from '../../routes/response';
import { findAllNegocios, findOneNegocio, validarIdentificador, validarUsuario } from "./negocios.utils";
import { borrarArchivo, uploadOptImg } from '../upload/upload.utils';
import { errorHandler } from '../../helpers/errorHandler';

// Tamaño estandar de las imagenes de los banners
const imgWidth: number = 600;
const imgHeight: number = 250;

export const getNegocios = async (req: any, res: Response) => {
  try { success(req, res, await findAllNegocios(req.query.filtro || '', Number(req.query.pagina) || 1, Number(req.query.porPagina) || 10 )); }
  catch (err) { errorHandler(req, res, err); }
}

export const getNegocio = async (req: Request, res: Response) => {
  try { success(req, res, await findOneNegocio(req.params.id)); }
  catch (err) { errorHandler(req, res, err); }
}


export const getValidarUsuario = async (req: Request, res: Response) => {
  try { success(req, res, await validarUsuario()); }
  catch (err) { errorHandler(req, res, err); }
}

export const getValidarIdentificadorNegocio = async (req: Request, res: Response) => {
  try { success(req, res, await validarIdentificador()); }
  catch (err) { errorHandler(req, res, err); }
}

export const actualizarNegocio = async (req: Request, res: Response) => {

  const uid = req.params.id;
  const update: any = JSON.parse(req.body.data);

  try {

    // Buscamos el negocio en la BD
    const negocioBD = await Negocio.findById(uid);
    
    if (!negocioBD) {
      return error(req, res, 'El negocio no fue encontrado en BD', 400, 'negocio no encontrado en BD');
    }

    // 1. Eliminamos las img que estan el en array viejo y no estan en el array nuevo
    negocioBD.banner?.forEach((imgOld: any) => {
      if (!update.banner?.includes(imgOld)) {
        borrarArchivo(`banner/${imgOld}`);
      }
    });

    if (req.files) {

      if (update.tipofile === 'banner') {

        // 2. Subimos las img nuevas aws
        const banerImg = await uploadOptImg(req.files.imagen, 'banner', imgWidth, imgHeight);
        update.banner.push({ img: banerImg, url: '' });

      } else if (update.tipofile === 'logo') {

        // 1. Subimos el logo a aws
        update.logo = await uploadOptImg(req.files.imagen, 'logo', 300, 300);

        // 2. Eliminamos el logo viejo
        borrarArchivo(`logo/${negocioBD.logo}`);

      }

    }

    // Actualizamos el negocio
    const negocioActualizado = await Negocio.findByIdAndUpdate(uid, update, { new: true, useFindAndModify: false })
                                            .populate('sedes.encargado');

    success(req, res, negocioActualizado);

  } catch (err) {

    error(req, res, 'Ocurrio un error inesperado', 500, err);
  }

};
