import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';


export const checkJwt =(req: Request, res: Response, next: NextFunction)=>{
    
    console.log('REQ-> ', req.headers);
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try{
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;



    }catch(e){
        return res.status(401).json({message:'No Autorizado'});
    }


    const {userId, username } = jwtPayload;
    const newToken = jwt.sign({userId, username}, config.jwtSecret);
    res.setHeader('token',newToken);
    next();

}

export const checkToken =(req: Request, res: Response, next: NextFunction)=>{
    
    let token = <string>req.headers['authorization'];
    console.log(req.headers)

    if (!token) {
        res.status(401).send({
            error: "Es necesario el token de autenticación"
        });
        return;
    }

    token = token.replace('Bearer ', '');
    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            res.status(401).send({
                error: "Token no valido"
            });
        }
        else {
            res.locals.userId = user['userId'];
            res.locals.userName = user['userName'];
            next();
        }
    });
}