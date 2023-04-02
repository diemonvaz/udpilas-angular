import {Router} from 'express'; 
import EstadosSociosController from '../controller/EstadosSociosController';
import { checkToken } from '../midelware/jwt';

const router = Router();

//get a todos los tipos de carnet
router.get("/getAll", [checkToken], EstadosSociosController.getAll);

export default router;