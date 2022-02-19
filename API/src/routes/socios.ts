import {Router} from 'express';
import SociosController from '../controller/SociosController';
import {checkToken} from './../midelware/jwt';

const router = Router();

router.get('/:id', SociosController.getById);

//
//router.post('/',[checkToken], SociosController.newCitaFromTicket);

export default router;