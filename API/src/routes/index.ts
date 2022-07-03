import  {Router} from 'express';
import router from './socios';
import socios from './socios';
import noticias from './noticias';
import etiquetas from './etiquetas';

const routes = Router();
routes.use('/socios',socios);
routes.use('/noticias',noticias);
routes.use('/etiquetas', etiquetas)

export default routes;