import 'reflect-metadata';
import { createConnections } from 'typeorm';
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as http from 'http';
import * as cron from 'node-cron';
import * as shell from 'shelljs';
import routes from './routes';

const PORT = process.env.PORT || 3000;
const PORT_WEBSOCKET = 3001;

createConnections().then(async () => {

    // create express app
    const app = express();

    //Middlewares
    app.use(cors());
    app.use(helmet());
    
    app.use(express.json());

    app.use('/', routes);

    const server = http.createServer(app);

    // start express server
    app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`));

}).catch(error => console.log(error));
