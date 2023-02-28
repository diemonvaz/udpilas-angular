import {Router} from 'express'; 
import NoticiasController from '../controller/NoticiasController';

const router = Router();

//buscar noticias por id
router.get('/getById/:id', NoticiasController.getById);

//buscar noticias por titulo 
router.get('/getByTitulo/:tituloNoticia', NoticiasController.getByTitulo);

//buscar noticias por etiqueta 
router.get('/getByEtiqueta/:etiqueta', NoticiasController.getByEtiqueta);

//get a todas las noticias
router.get('/getAll', NoticiasController.getAll);

//insertar nuevas noticias
router.post('/postNoticia', NoticiasController.postNoticia);

//buscar ultimas X noticias
router.get('/getUltimasInsertadas/:num', NoticiasController.getUltimasInsertadas);

router.put('/updateById/:id', NoticiasController.updateById);

router.delete('/deleteById/:id',  NoticiasController.deleteById);


export default router;