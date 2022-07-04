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
                res.status(404).json({message: 'Etiqueta no encontrada'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };

    
    static getAll = async (req: Request, res: Response)=>{

        const repository = getRepository(Etiquetas);
        try{
            const etiquetas = await repository.find();
            res.send(etiquetas);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };


    static postEtiqueta = async (req: Request, res: Response)=>{
        try {
            const {
                nombre
            } = req.body;
            const aux = await Etiquetas.findOne({nombre: req.body.nombre});
            if(aux == null) {
                const etiqueta = Etiquetas.create({
                    nombre: nombre
                });
                await etiqueta.save();
                return res.json(etiqueta);
            }
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
        
    };


}

export default EtiquetasController;