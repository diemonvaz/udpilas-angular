import {getRepository} from "typeorm";
import { Request, Response} from "express";
import { Socios } from "../entity/Socios";
import moment = require("moment");
import { validate } from "class-validator";


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