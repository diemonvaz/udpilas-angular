import { TiposAbonoController } from '../controller/TiposAbonoController';
import {Router} from 'express'; 

const router = Router();

//get a todos los tipos de carnet
router.get("/getAll", TiposAbonoController.getAll);

export default router;