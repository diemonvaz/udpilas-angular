import {getRepository} from "typeorm";
import { Request, Response} from "express";
import { Roles } from "../entity/Roles";

export class RolesController {

    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Roles);
        try{
            const roles = await repository.find();
            res.send(roles);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error, no se pudieron obtener los roles existentes'});
        }
    };

}