import {getRepository, Repository} from "typeorm";
import { Request, Response} from "express";
import { Jugadores } from "../entity/Jugadores";

export class JugadoresController {


    
    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Jugadores);
        try{
            const jugadores = await repository.createQueryBuilder("miembro")
            .getMany();
            res.send(jugadores);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error al hacer GET sobre Jugadores'});
        }
    };

  

    static deleteById = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Jugadores);
       
        try{
            const jugador = await repository.findOne(id);
            if(jugador) {
                await repository.remove(jugador); //usando el repository.delete(...) no funciona
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Jugador no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };

    static updateById= async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Jugadores);
        try{
            const jugador = await repository.findOne(id, {relations: []});
            if(jugador) {
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Jugador no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };
    





}