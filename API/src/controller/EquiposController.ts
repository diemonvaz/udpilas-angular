import {getRepository, Repository} from "typeorm";
import { Request, Response} from "express";
import { Jugadores } from "../entity/Jugadores";
import { Equipos } from "../entity/Equipos";

export class EquiposController {

    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Equipos);
        try{
            const equipos = await repository.createQueryBuilder("equipos")
            .getMany();
            res.send(equipos);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error al hacer GET sobre Equipos'});
        }
    };

  

    static deleteById = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Equipos);
       
        try{
            const equipo = await repository.findOne(id);
            if(equipo) {
                await repository.remove(equipo); //usando el repository.delete(...) no funciona
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Equipo no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };

    static updateById= async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Equipos);
        try{
            const equipo = await repository.findOne(id, {relations: []});
            if(equipo) {
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Equipo no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };
    





}