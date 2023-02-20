import {Router} from 'express';
import { MiembrosController } from '../controller/MiembrosController';
const router = Router();

router.get('/getAll', MiembrosController.getAll);
router.post('/registro', MiembrosController.registro);
router.delete('/deleteById/:id',  MiembrosController.deleteById);
router.put('/updateById/:id', MiembrosController.updateById);


export default router;