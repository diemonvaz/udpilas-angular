import {Router} from 'express';
import { MiembrosController } from '../controller/MiembrosController';
const router = Router();

router.get('/getAll', MiembrosController.getAll);
router.post('/registro', MiembrosController.registro);

export default router;