import {Router} from 'express';
import UsuariosController from '../controller/UsuariosController';
import {checkToken} from '../midelware/jwt';

const router = Router();

router.get('/:id', UsuariosController.getById);
router.post('/', UsuariosController.registroUsuario);
router.post('/registro', UsuariosController.registro);
router.post('/login', UsuariosController.login);
//router.post('/',[checkToken], SociosController.newCitaFromTicket);

export default router;