import { RegistrosCorporalesController } from './../controller/RegistrosCorporalesController';
import {Router} from 'express';
const router = Router();

router.get('/getAll', RegistrosCorporalesController.getAll);
router.delete('/deleteById/:id',  RegistrosCorporalesController.deleteById);
router.put('/updateById/:id', RegistrosCorporalesController.updateById);
router.post('/registro', RegistrosCorporalesController.nuevoRegCorporal);

export default router;