import {Router} from 'express';
import SociosController from '../controller/SociosController';
import {checkToken} from '../midelware/jwt';

const router = Router();

router.get('/getById/:id', [checkToken], SociosController.getById);
router.get('/getAll', [checkToken], SociosController.getAll);
router.post('/postSocio', [checkToken], SociosController.postSocio);
router.delete('/deleteById/:id', [checkToken], SociosController.deleteById);
router.put('/updateById/:id', [checkToken], SociosController.updateById);
//
//router.post('/',[checkToken], SociosController.newCitaFromTicket);

export default router;