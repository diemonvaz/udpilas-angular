import {Router} from 'express';
import { JugadoresController } from '../controller/JugadoresController';
import { checkToken } from '../midelware/jwt';
const router = Router();

router.get('/getAll', JugadoresController.getAll);
router.delete('/deleteById/:id', [checkToken], JugadoresController.deleteById);
router.post('/registro', [checkToken], JugadoresController.postJugador);
router.put('/updateById/:id', [checkToken], JugadoresController.updateById);
router.post('/transferirJugador', [checkToken], JugadoresController.transferirJugador);

export default router;