import {Router} from 'express'; 
import NoticiasController from '../controller/NoticiasController';

const router = Router();

//buscar noticias por id
router.get('/getById/:id', NoticiasController.getById);

//get a todas las noticias
router.get('/getAll', NoticiasController.getAll);

//insertar nuevas noticias
router.post('/postNoticia', NoticiasController.postNoticia);


export default router;