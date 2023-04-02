import { checkToken } from '../midelware/jwt';
import { RegistrosCorporalesController } from './../controller/RegistrosCorporalesController';
import {Router} from 'express';
const router = Router();

router.get('/getAll', [checkToken], RegistrosCorporalesController.getAll);
router.delete('/deleteById/:id', [checkToken], RegistrosCorporalesController.deleteById);
router.put('/updateById/:id', [checkToken], RegistrosCorporalesController.updateById);
router.post('/registro', [checkToken],RegistrosCorporalesController.nuevoRegCorporal);

export default router;