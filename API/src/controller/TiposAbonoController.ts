import { TiposAbono } from '../entity/TiposAbono';
import {getRepository} from "typeorm";
import { Request, Response} from "express";

export class TiposAbonoController {

    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(TiposAbono);
        try{
            const tiposCarnet = await repository.find();
            res.send(tiposCarnet);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error, no se pudieron obtener los tipos de carnet existentes'});
        }
    };

}

export default TiposAbonoController;