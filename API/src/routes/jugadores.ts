import {Router} from 'express';
import { JugadoresController } from '../controller/JugadoresController';
const router = Router();

router.get('/getAll', JugadoresController.getAll);
router.delete('/deleteById/:id',  JugadoresController.deleteById);
router.put('/updateById/:id', JugadoresController.updateById);


export default router;