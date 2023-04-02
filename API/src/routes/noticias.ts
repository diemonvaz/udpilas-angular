import {Router} from 'express'; 
import NoticiasController from '../controller/NoticiasController';
import { checkToken } from '../midelware/jwt';

const router = Router();

//buscar noticias por id
router.get('/getById/:id', NoticiasController.getById);

//buscar noticias por titulo 
router.get('/getByTitulo/:tituloNoticia', NoticiasController.getByTitulo);

//buscar noticias por etiqueta 
router.get('/getByEtiqueta/:etiqueta', NoticiasController.getByEtiqueta);

//get a todas las noticias
router.get('/getAll', [checkToken], NoticiasController.getAll);

//get a todas las noticias aplicando restriccion de fecha publicacion
router.get('/getAllAfterDate', NoticiasController.getAllAfterDate);

//insertar nuevas noticias
router.post('/postNoticia', [checkToken], NoticiasController.postNoticia);

//buscar ultimas X noticias
router.get('/getUltimasInsertadas/:num', NoticiasController.getUltimasInsertadas);

router.put('/updateById/:id', [checkToken], NoticiasController.updateById);

router.delete('/deleteById/:id', [checkToken], NoticiasController.deleteById);


export default router;