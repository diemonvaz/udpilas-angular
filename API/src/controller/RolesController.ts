import {getRepository} from "typeorm";
import { Request, Response} from "express";
import { Roles } from "../entity/Roles";
import { Usuarios } from "../entity/Usuarios";

export class RolesController {

    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Roles);
        try{
            const roles = await repository.find();
            res.send(roles);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error, no se pudieron obtener los roles existentes'});
        }
    };

    static crearRol = async (req: Request, res: Response)=>{
        try {
            const {
                codigo,
                descripcion
            } = req.body;
            const aux = await Roles.findOne({codigo: req.body.codigo});
            if(aux == null) {
                const rol = Roles.create({
                    codigo: codigo,
                    descripcion: descripcion
                });
                await rol.save();
                return res.status(200).send({message: 'Rol creado con éxito'});
            }
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Se ha producido un error al crear un rol'});
        }
        
    };

    static deleteById = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Roles);
        const usuarioRepo = getRepository(Usuarios);
        
        try{
            const rol = await repository.findOne(id);
            if(rol) { 
                await rol.remove(); //de nuevo, si aqui uso el repository.delete() no funciona la eliminacion en cascadas de la tabla many to many
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Rol no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };

}