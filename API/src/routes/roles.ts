import { Roles } from './../entity/Roles';
import { RolesController } from './../controller/RolesController';
import {Router} from 'express';
import { checkToken } from '../midelware/jwt';
const router = Router();

router.get('/getAll', [checkToken], RolesController.getAll);
router.post('/crearRol', [checkToken],RolesController.crearRol);
router.delete('/deleteById/:id', [checkToken], RolesController.deleteById);

export default router;