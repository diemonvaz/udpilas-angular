import { Usuarios } from './entity/Usuarios';
import { Etiquetas } from './entity/Etiquetas';
import { Noticias } from './entity/Noticias';
import 'reflect-metadata';
import { Connection, ConnectionManager, createConnections, createConnection, getRepository, getConnectionManager, getManager } from 'typeorm';
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as http from 'http';
import * as cron from 'node-cron';
import * as shell from 'shelljs';
import routes from './routes';
import {Request, Response} from "express";
import { print } from 'util';


const PORT = process.env.PORT || 3000;
const PORT_WEBSOCKET = 3001;

createConnections().then(async  () => {

    // Creacion instancia express
    const app = express();

    //Middlewares
    app.use(cors());
    app.use(helmet());
    
    app.use(express.json());

    app.use('/', routes);
    
    const server = http.createServer(app);
    // inicio del servidor express
    app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`));

}).catch(error => console.log(error));
