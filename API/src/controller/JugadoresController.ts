import { Equipos } from './../entity/Equipos';
import {getRepository, Repository} from "typeorm";
import { Request, Response} from "express";
import { Jugadores } from "../entity/Jugadores";
import { Imagenes } from '../entity/Imagenes';

export class JugadoresController {


    
    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Jugadores);
        try{
            const jugadores = await repository.createQueryBuilder("jugador")
            .getMany();
            res.send(jugadores);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error al hacer GET sobre Jugadores'});
        }
    };

    static postJugador = async (req: Request, res: Response)=>{
        try {
            const {
                nombre,
                apellidos,
                posicion,
                fecha_nacimiento,
                dni,
                rec_medico,
                duracion,
                equipo,
                observaciones,
                imagen
            } = req.body;
            console.log(req.body);
            const equiposRepo = getRepository(Equipos);
            const equipoAsignado = await equiposRepo.findOne({nombre: equipo});
            const jugador = Jugadores.create({
                nombre: nombre,
                apellidos: apellidos,
                fecha_nacimiento: fecha_nacimiento,
                observaciones: observaciones,
                posicion: posicion,
                equipo: equipoAsignado,
                dni: dni,
                reconocimiento_medico: rec_medico,
                duracion: duracion,
                imagen: imagen
            });
            if(imagen) {
                const imgPerfil = Imagenes.create();
                imgPerfil.nombre = imagen;
                await imgPerfil.save()
                jugador.imagen = imgPerfil;
            }else {
                const imgPerfil = await Imagenes.findOne({nombre: 'url'});
                jugador.imagen = imgPerfil;
            }
            
       
            await getRepository(Jugadores).save(jugador);
            return res.json(jugador);
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Error'});
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