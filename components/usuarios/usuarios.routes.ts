import { Router } from 'express';
import { check, param } from 'express-validator';

import { validarCampos } from '../../middlewares/validar-campos';
import { validarJWT } from '../../middlewares/validar-jwt';
import { getUsuario, getUsuarios, nuevoUsuario, actualizarUsuario, resetPassword } from './usuarios.controller';

const router = Router();

router.get('/', [validarJWT], getUsuarios);

router.get('/:id', [validarJWT, param('id').isMongoId(), validarCampos], getUsuario);

router.post('/', [validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('user', 'El usuario es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  check('role', 'El role es obligatorio').isMongoId(),
  check('negocio', 'El negocio es obligatorio').isMongoId(),
  validarCampos], nuevoUsuario);

router.post('/resetpassword', [
  check('email', 'El email es obligatorio').not().isEmpty(),
  check('user', 'El user es obligatorio').not().isEmpty(),
  check('newpassword', 'El password es obligatorio').not().isEmpty()], resetPassword)

router.put('/:id', [validarJWT], actualizarUsuario);

export default router;
