import {getRepository, Repository} from "typeorm";
import { Request, Response} from "express";
import { Miembros } from "../entity/Miembros";
import * as bcrypt from "bcryptjs";
import { Usuarios } from "../entity/Usuarios";
import { Roles } from "../entity/Roles";
import nodemailer from 'nodemailer';

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
                return res.status(400).json({ message: "Email ya registrado" });
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

                /*const nodemailer = require('nodemailer');
                // configuración del servicio de correo electrónico
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: testAccount.user, // correo electrónico del remitente
                        pass: testAccount.pass // contraseña del remitente
                    }
                });

                // mensaje de correo electrónico
                let mailOptions = {
                    from: testAccount.user, // correo electrónico del remitente
                    to: email, // correo electrónico del destinatario (el nuevo miembro registrado)
                    subject: 'Bienvenido al club', // asunto del correo electrónico
                    text: 'Hola ' + nombre + ', \n\n ¡Bienvenido al club! \n\n Esperamos verte pronto en nuestras instalaciones. \n\n Saludos cordiales, \n\n El equipo del club' // contenido del correo electrónico
                };

                // enviar el correo electrónico
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Correo electrónico enviado: ' + info.response);
                    }
                });*/

                return res.status(200).json({ message: "Miembro creado con éxito", status: 200});  
            }
        }
        catch (e) {
            return res.status(500).json({ message: "Error" });
        }
    };

    static deleteById = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Miembros);
        const usRepo = getRepository(Usuarios);
        const rolRepo = getRepository(Roles);
        try{
            //You have to delete referencing side to take cascade deletion to take in effect
            const miembro = await repository.findOne(id);
            if(miembro) {
                const usuario = await usRepo.findOne(miembro.usuario.idusuario);
                //hay que eliminar tambien los roles asociados a ese usuario, si los tiene
                //al eliminar el usuario, como tenemos las cascades con roles se eliminan las relaciones
                //de la tabla intermedia many to many, y ademas como en miembros tenemos las cascades,
                //se elimina tambien el miembro de la relacion one to one
                await usRepo.remove(usuario); //usando el repository.delete(...) no funciona
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Miembro no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };

    static updateById= async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Miembros);
        try{
            const miembro = await repository.findOne(id, {relations: ["usuario", "usuario.roles"]});
            if(miembro) {
                //si ha habido cambios en los roles del miembro a actualizar, actualmente el cambio se hará efectivo cuando el token expire y se le regenere
                const usuario = miembro.usuario;
                await repository.merge(miembro, req.body);
                await repository.save(miembro);
                
                const rolesActualizados = await getRepository(Roles)
                    .createQueryBuilder("roles")
                    .where("roles.codigo IN (:codigos)", { codigos: req.body.usuario.roles })
                     .getMany();
                
                usuario.roles = rolesActualizados;
                console.log(req.body.usuario.roles)
                await getRepository(Usuarios).save(usuario);
                res.status(200).json({message: 'Miembro actualizado correctamente'});
            }
            else {
                res.status(404).json({message: 'Miembro no encontrado'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };
    





}