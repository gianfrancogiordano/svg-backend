import { Router } from 'express';
import { param } from 'express-validator';
import expressFileUpload from 'express-fileupload';

import { validarJWT } from '../../middlewares/validar-jwt';
import { getNegocio, getNegocios, actualizarNegocio, getValidarUsuario, getValidarIdentificadorNegocio } from './negocios.controller';

const router = Router();

// middleware de subida de archivos
router.use(expressFileUpload());

router.get('/validaridentificador', [validarJWT], getValidarIdentificadorNegocio);

router.get('/validarusuario', [validarJWT], getValidarUsuario);

router.get('/:id', [validarJWT, param('id').isMongoId()], getNegocio);

router.get('/', [validarJWT], getNegocios);

router.put('/:id', [validarJWT, param('id').isMongoId()], actualizarNegocio);

export default router;
