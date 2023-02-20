import { Roles } from './../entity/Roles';
import { RolesController } from './../controller/RolesController';
import {Router} from 'express';
const router = Router();

router.get('/getAll', RolesController.getAll);
router.post('/crearRol', RolesController.crearRol);
router.delete('/deleteById/:id',  RolesController.deleteById);

export default router;