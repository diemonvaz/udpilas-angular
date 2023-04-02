import {Router} from 'express';
import { MiembrosController } from '../controller/MiembrosController';
import { checkToken } from '../midelware/jwt';
const router = Router();

router.get('/getAll', [checkToken], MiembrosController.getAll);
router.post('/registro', [checkToken], MiembrosController.registro);
router.delete('/deleteById/:id', [checkToken], MiembrosController.deleteById);
router.put('/updateById/:id', [checkToken], MiembrosController.updateById);


export default router;