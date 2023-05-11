import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Usuarios } from "../entity/Usuarios";
import moment = require("moment");
import { validate } from "class-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { Roles } from "../entity/Roles";


export class UsuariosController {

    static getById = async (req: Request, res: Response) => {

        const id = req.params.id;
        const repository = getRepository(Usuarios);
        try {
            const user = await repository.findOne(id);
            if (user) {
                res.send(user);
            }
            else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Error' });
        }
    };

    static registro = async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const codigosRoles = req.body.roles;
        
        try {
            const usuariosRepository = getRepository(Usuarios);
            const usuario_existe = await usuariosRepository.createQueryBuilder("usuario")
                .where("email = '" + email + "'")
                .getOne();

            if (usuario_existe) {
                return res.status(401).json({ message: "Email ya registrado" });
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt)

                const user = new Usuarios();
                user.email = email;
                user.password = passwordHash;
                //Asignamos los roles pasados como parametro al usuario nuevo que vamos a insertar
                const rolRepository = getRepository(Roles);
                let listaRoles: Roles[] = [];
                for (let i = 0; i < codigosRoles.length; i++) {
                    const rol = await rolRepository.findOne({ where: { codigo: codigosRoles[i]} });
                    listaRoles.push(rol);
                }
                user.roles = listaRoles;

                await usuariosRepository.save(user);

                var response = {
                    "id": user.idusuario,
                    "email": user.email
                }
                //await UtilController.sendRegistroMail(usuario);
                res.send(response);
            }
        }
        catch (e) {
            return res.status(500).json({ message: "Error" });
        }
    };

    static login = async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email)
        console.log(password)
        //const grant_type = req.body.grant_type;
        //const refresh_token = req.body.refresh_token;
        try {
            const usuariosRepository = getRepository(Usuarios);
            const user = await usuariosRepository.createQueryBuilder("usuario")
                    .leftJoinAndSelect("usuario.roles", "roles")
                    .where("usuario.email = :email", { email: email})
                    .getOne();
            if (user) {

                if (user.password != null && user.password != "" && user.checkPassword(password)) {
                    let arrayRoles: String [] = [];
                    user.roles.forEach(rol => {
                        arrayRoles.push(rol.codigo);
                    });
                    const token = jwt.sign({ idusuario: user.idusuario, nombre: user.nombre, email: user.email, roles: arrayRoles }, config.jwtSecret, { expiresIn: "2 days" });
                    var response = {
                        "access_token": token,
                        "token_type": "bearer",
                        "expires_in": 604800000,
                        "scope": " write read",
                        "IDuser": user.idusuario,
                    };
                    
                    return res.send(response);
                }
                else {
                    return res.status(404).json({ message: "Email o Password no válidos" });
                }
            }
            else {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            
        }
        catch (e) {
            return res.status(500).json({ message: "Error" });
        }
    };





    ////////////////////////////////////////////////////////////////////////////

    

    static registroUsuario = async (req: Request, res: Response) => {
        const nombre_completo = req.body.nombre_completo;
        const email = req.body.email;
        const password = req.body.password;
        const fecha_nacimiento = req.body.fecha_nacimiento;

        try {
            const usuariosRepository = getRepository(Usuarios);
            const usuario_existe = await usuariosRepository.createQueryBuilder("usuario")
                .where("correo = '" + email + "'")
                .getOne();

            if (usuario_existe) {
                return res.status(401).json({ message: "Email ya registrado" });
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt)

                const user = new Usuarios();
                //user.nombre_completo = nombre_completo;
                //user.correo = email;
                user.password = passwordHash;
                user.fecha_nacimiento = fecha_nacimiento;


                await usuariosRepository.save(user);

                var response = {
                    "id": user.idusuario,
                    //"nombre": user.nombre_completo,
                    //"email": user.correo
                }

                //await UtilController.sendRegistroMail(usuario);
                res.send(response);
            }
        }

        catch (e) {
            return res.status(500).json({ message: "Error" });
        }
    };


    static oauth_token = async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const grant_type = req.body.grant_type;
        const refresh_token = req.body.refresh_token;

        try {
            const usuariosRepository = getRepository(Usuarios);
            if (grant_type == 'password') {

                const user = await usuariosRepository.findOne({ where: { correo: email} });
                if (user) {

                    if (user.password != null && user.password != "" && user.checkPassword(password)) {
                        //const token = jwt.sign({ userID: user.idusuario, email: user.correo }, config.jwtSecret, { expiresIn: "7 days" });
                        var response = {
                            //"access_token": token,
                            "token_type": "bearer",
                            "expires_in": 604800000,
                            "scope": " write read",
                            "IDuser": user.idusuario,
                        };

                        // await UtilController.sendLoginMail(usuario);
                        return res.send(response);
                    }
                    else {
                        return res.status(404).json({ message: "Email o Password no válidos" });
                    }
                }
                else {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
            }
            else if (grant_type == 'email') {

                const usuariosRepository = getRepository(Usuarios);
                const user = await usuariosRepository.findOne({ where: { correo: email, fk_platform: 2 } });
                if (user) {
                    //const token = jwt.sign({ userId: user.idusuario, email: user.correo }, config.jwtSecret, { expiresIn: "7 days" });
                    /*var response = {
                        "access_token": token,
                        "token_type": "bearer",
                        "expires_in": 604800000,
                        "scope": " write read",
                        "IDuser": user.idusuario,
                    };*/

                    return res.send(response);
                }
                else {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
            }
        }
        catch (e) {
            return res.status(500).json({ message: "Error" });
        }
    };

}

export default UsuariosController;