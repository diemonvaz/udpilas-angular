import { EtiquetasController } from './../controller/EtiquetasController';
import {Router} from 'express'; 

const router = Router();

//get a todas las etiquetas
router.get("/", EtiquetasController.getAll);

//insertar nuevas etiqueta

router.post('/postEtiqueta', EtiquetasController.postEtiqueta);

export default router;