import { RolesController } from './../controller/RolesController';
import {Router} from 'express';
const router = Router();

router.get('/getAll', RolesController.getAll);

export default router;