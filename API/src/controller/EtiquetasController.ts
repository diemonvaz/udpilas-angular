import {getRepository} from "typeorm";
import { Request, Response} from "express";
import { Etiquetas } from "../entity/Etiquetas";
import moment = require("moment");
import { validate } from "class-validator";

export class EtiquetasController {


    static getById = async (req: Request, res: Response)=>{

        const id = req.params.id;
        const repository = getRepository(Etiquetas);
        try{
            const etiqueta = await repository.findOne(id);
            if(etiqueta) {
                res.send(etiqueta);
            }
            else {
                res.status(404).json({message: 'Socio no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };
}

export default EtiquetasController;