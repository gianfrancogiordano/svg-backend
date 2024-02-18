import { Router } from 'express';
import { validarJWT } from '../../middlewares/validar-jwt';
import { getVentasGrafico, getStockAlarm } from './dashboard.controller';

const router = Router();

router.get('/ventas', [validarJWT], getVentasGrafico);
router.get('/stockalarm', [validarJWT], getStockAlarm);

export default router;

