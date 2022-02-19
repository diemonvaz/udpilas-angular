import  {Router} from 'express';
import socios from './socios';


const routes = Router();
routes.use('/socios',socios);

export default routes;