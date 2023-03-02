import { EquiposController } from './../controller/EquiposController';
import {Router} from 'express';
const router = Router();

router.get('/getAll', EquiposController.getAll);
router.delete('/deleteById/:id',  EquiposController.deleteById);
router.put('/updateById/:id', EquiposController.updateById);


export default router;