import  {Router} from 'express';
import socios from './socios';
import noticias from './noticias';
import etiquetas from './etiquetas';
import tipos_abono from './tipos_abono';
import estados_socios from './estados_socios';
import usuarios from './usuarios';
import miembros from './miembros';
import roles from './roles';
import jugadores from './jugadores';
import equipos from './equipos';
import registros_corporales from './registros_corporales';
import entrenamientos from './entrenamientos';

const routes = Router();
routes.use('/socios',socios);
routes.use('/noticias',noticias);
routes.use('/etiquetas', etiquetas);
routes.use('/tipos_abono', tipos_abono);
routes.use('/estados_socios', estados_socios);
routes.use('/usuarios', usuarios);
routes.use('/miembros', miembros);
routes.use('/roles', roles);
routes.use('/jugadores', jugadores);
routes.use('/equipos', equipos);
routes.use('/registros_corporales', registros_corporales);
routes.use('/entrenamientos', entrenamientos);


export default routes;