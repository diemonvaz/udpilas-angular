import { checkToken } from '../midelware/jwt';
import { EquiposController } from './../controller/EquiposController';
import {Router} from 'express';
const router = Router();

router.get('/getAll', EquiposController.getAll);
router.get('/getAllAdm', [checkToken], EquiposController.getAll);
router.delete('/deleteById/:id', [checkToken], EquiposController.deleteById);
router.put('/updateById/:id', [checkToken], EquiposController.updateById);


export default router;