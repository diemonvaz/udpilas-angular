import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EstadosSocios } from "../entity/EstadosSocios";


export class EstadosSociosController {


    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(EstadosSocios);
        try{
            const estados = await repository.find();
            res.send(estados);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error, no se pudieron obtener los estados de socios existentes'});
        }
    };


}
export default EstadosSociosController;