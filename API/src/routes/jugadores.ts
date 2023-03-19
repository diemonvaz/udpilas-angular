import {Router} from 'express';
import { JugadoresController } from '../controller/JugadoresController';
const router = Router();

router.get('/getAll', JugadoresController.getAll);
router.delete('/deleteById/:id',  JugadoresController.deleteById);
router.post('/registro', JugadoresController.postJugador);
router.put('/updateById/:id', JugadoresController.updateById);
router.post('/transferirJugador', JugadoresController.transferirJugador);

export default router;