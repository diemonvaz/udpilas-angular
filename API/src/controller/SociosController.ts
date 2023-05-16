import {getRepository, Repository} from "typeorm";
import { Request, Response} from "express";
import { Socios } from "../entity/Socios";
import { TiposAbono } from "../entity/TiposAbono";
import { EstadosSocios } from "../entity/EstadosSocios";


export class SociosController {

    static getById = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Socios);
        try{
            const socio = await repository.findOne(id);
            if(socio) {
                res.send(socio);
            }
            else {
                res.status(404).json({message: 'Socio no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };
    

    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Socios);
        try{
            const socios = await repository.createQueryBuilder("socio")
            .leftJoinAndSelect("socio.tipo_abono", "tipo_abono")
            .leftJoinAndSelect("socio.estado_2223", "estado_2223")
            .getMany();
            res.send(socios);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error al hacer GET sobre Socios'});
        }
    };



    static postSocio = async (req: Request, res: Response)=>{
        try {
            const {
                nombre_completo,
                domicilio,
                poblacion,
                telefono,
                correo_electronico,
                fecha_nacimiento,
                dni,
                tipo_abono,
                estado_2223
            } = req.body;
            console.log(req.body);
            const socio = Socios.create({
                nombre_completo: nombre_completo,
                domicilio: domicilio,
                poblacion: poblacion,
                telefono: telefono,
                correo_electronico: correo_electronico,
                fecha_nacimiento: fecha_nacimiento,
                dni: dni,
                tipo_abono: tipo_abono,
                estado_2223: estado_2223
            });
            const tipoCarnetRepo = getRepository(TiposAbono);
            const tipo = await tipoCarnetRepo.findOne(tipo_abono);
            const estadoRepo = getRepository(EstadosSocios);
            const estado = await estadoRepo.findOne(estado_2223);
            socio.tipo_abono = tipo;
            socio.estado_2223 = estado;
            await socio.save();
            
            return res.json(socio);
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
        
    };

    static deleteById = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Socios);
        try{
            const socio = await repository.findOne(id);
            if(socio) {
                await repository.delete(socio);
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Socio no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };

    static updateById= async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Socios);
        try{
            const socio = await repository.createQueryBuilder("socio")
            .leftJoinAndSelect("socio.tipo_abono", "tipo_abono")
            .leftJoinAndSelect("socio.estado_2223", "estado_2223")
            .where("socio.idsocio = :id", { id: id})
            .getOne();
            if(socio) {
                await repository.merge(socio, req.body);
                await repository.save(socio);
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Socio no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };


/*
    static newCitaFromTicket = async (req: Request, res: Response)=>{
        console.log('EL BODY');
        console.log(req.body);

        const idticket = req.body.idTicket;
        const userId = res.locals.userId;
        const fecha = req.body.fecha_cita;        
        const weblord = req.body.weblord;        
        let fechaCita = '';
        var hoy = moment().format('YYYY-MM-DD');
        const repositoryTicket = getRepository(Tickets);
        const repositoryCitas = getRepository(Citas);

        try{
            const ticket = await repositoryTicket.createQueryBuilder("ticket")
                .where("ticket.ID = " + idticket)
                .getOne();

            if (ticket) {

                if(ticket.FK_entities == 637){
                    
                    fechaCita = moment(fecha).format('YYYY-MM-DD');
    
                    if(fechaCita < hoy){
                        res.status(404).json({message: 'La fecha y hora no puede ser inferior a la actual'});
                    }
                }

                let cita = new Citas();
                cita.fecha_creacion = moment().format('YYYY-MM-DD HH:mm:ss');
                cita.fk_tecnico = userId;
                cita.fk_estado_cita = 1; // cita aceptada
                cita.fk_tracking = idticket;
                cita.fecha_cita = moment(fecha).format('YYYY-MM-DD HH:mm');
                cita.fecha_modificacion = moment().format('YYYY-MM-DD HH:mm:ss');
                cita.tipo_cita = 'ON_SITE';
                cita.fk_user_created = userId;
                cita.weblord =  weblord;

                await repositoryCitas.save(cita);
                res.send(cita);
                
                const validationOpt = { validationError: { target: false, value: false } };
                const errors = await validate(cita, validationOpt);
        
                if(errors.length > 0){
                    return res.status(401).json(errors);
                }


            }
            else {
                return res.status(404).json({message: 'Ticket no encontrado'});
            }
  
        }catch(e){
            res.status(500).json({message: 'Error'});
        }
    };
*/

}

export default SociosController;