import {getRepository, Repository} from "typeorm";
import { Request, Response} from "express";
import { Miembros } from "../entity/Miembros";
import * as bcrypt from "bcryptjs";
import { Usuarios } from "../entity/Usuarios";
import { Roles } from "../entity/Roles";

export class MiembrosController {

    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Miembros);
        try{
            const miembros = await repository.createQueryBuilder("miembro")
            .leftJoinAndSelect("miembro.usuario", "usuario")
            .leftJoinAndSelect("usuario.roles", "roles")
            .getMany();
            res.send(miembros);
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error al hacer GET sobre Miembros'});
        }
    };

    static registro = async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const nombre = req.body.nombre;
        const apellidos = req.body.apellidos;
        const dni = req.body.dni;
        const poblacion = req.body.poblacion;
        const telefono = req.body.telefono;
        const fecha_nacimiento = req.body.fecha_nacimiento;
        const domicilio = req.body.domicilio;
        const codigosRoles = req.body.roles;
        
        try {
            const usuariosRepository = getRepository(Usuarios);
            const rolRepository = getRepository(Roles);
            const miembrosRepository = getRepository(Miembros);
            const usuario_existe = await usuariosRepository.createQueryBuilder("usuario")
                .where("email = '" + email + "'")
                .getOne();

            if (usuario_existe) {
                return res.status(401).json({ message: "Email ya registrado" });
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt)
                //hay que crear un usuario y un miembro
                //Usuario
                const user = new Usuarios();
                user.email = email;
                user.password = passwordHash;
                user.email = email;
                user.fecha_nacimiento = fecha_nacimiento;
                user.telefono = telefono;
                user.nombre = nombre;
                user.apellidos = apellidos;
                //Asignamos los roles pasados como parametro al usuario nuevo que vamos a insertar
                let listaRoles: Roles[] = [];
                for (let i = 0; i < codigosRoles.length; i++) {
                    const rol = await rolRepository.findOne({ where: { codigo: codigosRoles[i]} });
                    listaRoles.push(rol);
                }
                user.roles = listaRoles;
                await usuariosRepository.save(user);
                //Miembro
                const miembro = new Miembros();
                miembro.dni = dni;
                miembro.domicilio = domicilio;
                miembro.poblacion = poblacion;
                miembro.usuario = user;

                await miembrosRepository.save(miembro);
                //await UtilController.sendRegistroMail(usuario);
                return res.status(200).json({ message: "Miembro creado con éxito"});  
            }
        }
        catch (e) {
            return res.status(500).json({ message: "Error" });
        }
    };





}