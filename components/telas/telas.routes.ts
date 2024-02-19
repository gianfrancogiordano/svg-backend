import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../../middlewares/validar-campos";
import { validarJWT } from "../../middlewares/validar-jwt";
import { createTela, deleteTela, getTela, getTelas, updateTela } from "./telas.controller";

const router = Router();

router.get('/', [validarJWT], getTelas);

router.get('/:id', [validarJWT], getTela);

router.post('/', [validarJWT,
    check('usuario', 'El usuario de la tela es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion de la tela es obligatoria').not().isEmpty(),
    check('cantidad', 'La cantidad de tela es obligatoria').not().isEmpty(),
    validarCampos], createTela);

router.put('/:id', [validarJWT], updateTela);

router.delete('/:id', [validarJWT], deleteTela);

export default router;
