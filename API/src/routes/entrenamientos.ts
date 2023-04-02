import { checkToken } from '../midelware/jwt';
import { EntrenamientosController } from './../controller/EntrenamientosController';
import {Router} from 'express';

const router = Router();

router.get('/getAll', [checkToken], EntrenamientosController.getAll);
router.post('/registro', [checkToken], EntrenamientosController.nuevoEntrenamiento);
router.delete('/deleteById/:id', [checkToken], EntrenamientosController.deleteById);

export default router;