import  {Router} from 'express';
import router from './socios';
import socios from './socios';
import noticias from './noticias';

const routes = Router();
routes.use('/socios',socios);
routes.use('/noticias',noticias);

export default routes;