import { EntrenamientosController } from './../controller/EntrenamientosController';
import {Router} from 'express';

const router = Router();

router.get('/getAll', EntrenamientosController.getAll);
router.post('/registro', EntrenamientosController.nuevoEntrenamiento);
router.delete('/deleteById/:id',  EntrenamientosController.deleteById);

export default router;