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

   
    static nuevoRegCorporal = async (req: Request, res: Response)=>{
        try {
            const {
                idjugador,
                altura,
                peso,
                imc,
                masa_muscular,
                masa_osea,
                tmb,
                agua,
                observaciones
            } = req.body;
            
            const jugador = await Jugadores.findOne(idjugador);
            const nuevoRegistro = RegistrosCorporales.create({
                altura: altura,
                peso: peso,
                imc: imc,
                masa_muscular: masa_muscular,
                masa_osea: masa_osea,
                TMB: tmb,
                agua: agua,
                observaciones: observaciones,
                fecha: new Date(),
                jugador: jugador
            });
            await getRepository(RegistrosCorporales).save(nuevoRegistro);
            return res.json(nuevoRegistro);
        }catch(e) {
            console.log(e);
            return res.status(500).json({message: 'Error'});
        }
    };








}