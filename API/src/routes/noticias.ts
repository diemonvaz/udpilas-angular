import {Router} from 'express'; 
import NoticiasController from '../controller/NoticiasController';
import { Noticias } from '../entity/Noticias';
import { Etiquetas } from '../entity/Etiquetas';
const router = Router();

//buscar noticias por id
router.get('/:id', NoticiasController.getById);

//insertar nuevas noticias
router.post('/postNoticia', NoticiasController.postNoticia);


export default router;