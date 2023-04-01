import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Entrenamientos } from "../entity/Entrenamientos";
import { Equipos } from "../entity/Equipos";
import { Jugadores } from "../entity/Jugadores";
import { Miembros } from "../entity/Miembros";

export class EntrenamientosController {

     
    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Entrenamientos);
        try{
            const entrenamientos = await repository.find();
            res.send(entrenamientos);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error al hacer GET sobre Entrenamientos'});
        }
    };



    static nuevoEntrenamiento = async (req: Request, res: Response)=>{
        try {
            const {
                idusuario,
                fecha,
                observaciones,
                jugadores,
                idequipo
            } = req.body;
            
            const miembro = await Miembros.createQueryBuilder("miembro")
                        .where("miembro.usuario.idusuario = :id", { id: idusuario})
                        .getOne();
            
            let jugadoresQueEntrenaron: Jugadores[] = [];
            if(jugadores) {
                for (let i = 0; i < jugadores.length; i++) {
                    const aux = await Jugadores.findOne(jugadores[i].idjugadores); 
                    jugadoresQueEntrenaron.push(aux)
                    console.log(jugadoresQueEntrenaron)
                }
            }
           

            const equipo = await Equipos.findOne(idequipo);
            const nuevoEntrenamiento = Entrenamientos.create({
                fecha: fecha,
                observaciones: observaciones,
                miembro: miembro,
                equipo: equipo
            })
            if(jugadores) {
                nuevoEntrenamiento.jugadores = jugadoresQueEntrenaron;
            }
            await getRepository(Entrenamientos).save(nuevoEntrenamiento);
            return res.json(nuevoEntrenamiento);
        }catch(e) {
            console.log(e);
            return res.status(500).json({message: 'Error'});
        }
    };

    static deleteById = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Entrenamientos);
       
        try{
            const entrenamiento = await repository.findOne(id);
            if(entrenamiento) {
                await repository.remove(entrenamiento); 
                res.status(200).json({ message: "Entrenamiento eliminado correctamente" });

            }
            else {
                res.status(404).json({message: 'Entrenamiento no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };




}