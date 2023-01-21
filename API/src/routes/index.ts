import  {Router} from 'express';
import socios from './socios';
import noticias from './noticias';
import etiquetas from './etiquetas';
import tipos_abono from './tipos_abono';
import estados_socios from './estados_socios';
import usuarios from './usuarios';

const routes = Router();
routes.use('/socios',socios);
routes.use('/noticias',noticias);
routes.use('/etiquetas', etiquetas);
routes.use('/tipos_abono', tipos_abono);
routes.use('/estados_socios', estados_socios);
routes.use('/usuarios', usuarios);
export default routes;