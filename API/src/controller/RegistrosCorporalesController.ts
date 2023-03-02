import { RegistrosCorporales } from './../entity/RegistrosCorporales';
import {getRepository, Repository} from "typeorm";
import { Request, Response} from "express";
import { Jugadores } from "../entity/Jugadores";
import { Equipos } from "../entity/Equipos";

export class RegistrosCorporalesController {

    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(RegistrosCorporales);
        try{
            const regCorporales = await repository.createQueryBuilder("registros_corporales")
            .getMany();
            res.send(regCorporales);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error al hacer GET sobre Registros Corporales'});
        }
    };

  

    static deleteById = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(RegistrosCorporales);
       
        try{
            const regCorporal = await repository.findOne(id);
            if(regCorporal) {
                await repository.remove(regCorporal); //usando el repository.delete(...) no funciona
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Registro corporal no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };

    static updateById= async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(RegistrosCorporales);
        try{
            const regCorporal = await repository.findOne(id, {relations: []});
            if(regCorporal) {
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Registro corporal no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };
    





}