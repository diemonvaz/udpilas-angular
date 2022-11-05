import {Router} from 'express'; 
import EstadosSociosController from '../controller/EstadosSociosController';

const router = Router();

//get a todos los tipos de carnet
router.get("/getAll", EstadosSociosController.getAll);

export default router;