import {Router} from 'express'; 
import NoticiasController from '../controller/NoticiasController';

const router = Router();

//buscar noticias por id
router.get('/:id', NoticiasController.getById);

//insertar nuevas noticias
router.post('/postNoticia', NoticiasController.postNoticia);


export default router;