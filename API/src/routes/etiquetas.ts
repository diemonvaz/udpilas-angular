import { checkToken } from '../midelware/jwt';
import { EtiquetasController } from './../controller/EtiquetasController';
import {Router} from 'express'; 

const router = Router();

//get a todas las etiquetas
router.get("/", [checkToken], EtiquetasController.getAll);
//insertar nuevas etiqueta
router.post('/postEtiqueta', [checkToken],  EtiquetasController.postEtiqueta);

export default router;