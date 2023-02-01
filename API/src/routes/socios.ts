import {Router} from 'express';
import SociosController from '../controller/SociosController';
import {checkToken} from '../midelware/jwt';

const router = Router();

router.get('/getById/:id', SociosController.getById);
router.get('/getAll', SociosController.getAll);
router.post('/postSocio', SociosController.postSocio);
router.delete('/deleteById/:id',  SociosController.deleteById);
router.put('/updateById/:id', SociosController.updateById);
//
//router.post('/',[checkToken], SociosController.newCitaFromTicket);

export default router;