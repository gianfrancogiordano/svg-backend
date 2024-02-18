import { Router } from 'express';
import { validarJWT } from '../../middlewares/validar-jwt';
import expressFileUpload from 'express-fileupload';
import { getFile, getFileForCanvas } from './upload.controller';

// middleware para html2canvas
const proxy = require('html2canvas-proxy');

const router = Router();

// middleware de subida de archivos
router.use(expressFileUpload());

router.get('/html2canvas', proxy(), getFileForCanvas);
router.get('/:tipo/:file', getFile);

export default router;
