import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import * as moment from 'moment';
import { EnvioTransporte } from "../entity/EnvioTransporte";
import { TransporteIncidenciasTipos } from "../entity/TransporteIncidenciasTipos";
import { TransporteIncidenciasEstados } from "../entity/TransporteIncidenciasEstados";
import { Manufacturer } from "../entity/Manufacturer";
import { DeviceModel } from "../entity/DeviceModel";
import { AlmacenesMovimientos } from "../entity/AlmacenesMovimientos";
import { ElementoInventario } from "../entity/ElementoInventario";
import { FamiliaProductos } from "../entity/FamiliaProductos";
import { TipoDispositivo } from "../entity/TipoDispositivo";
import { Contratos } from "../entity/Contratos";
import { Valoraciones } from "../entity/Valoraciones";
import { ElementoInventarioCompatibilidad } from "../entity/ElementoInventarioCompatibilidad";
import { ElementoInventarioJerarquia } from "../entity/ElementoInventarioJerarquia";


export const checkPages = (req: Request, res: Response, next: NextFunction) => {

    const page = req.query.page ? Number(req.query.page) : 0;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

    if (page < 0 || isNaN(page)) {
        var response = config.page_err;
        return res.status(401).json(response);
    }
    else {
        if (isNaN(pageSize) || pageSize < 0) {
            var response = config.page_err;
            return res.status(401).json(response);
        }
        // else if (pageSize > 50) {
        //     var response = config.pagesize_err;
        //     return res.status(401).json(response);
        // }
        else {
            next();
        }
    }
}

export const checkClient = (req: Request, res: Response, next: NextFunction) => {

    const auth = req.header('Authentication');
    if (!auth) {
        return res.status(401).json({ message: "client authentication missing" });
    }

    var base64 = auth.split("Basic ")[1];
    if (base64 === undefined) {
        base64 = '';
    }

    if (base64 !== config.client64) {
        return res.status(401).json({ message: 'Bad client authentication' });
    }
    else {
        next();
    }
}

export const checkOauth = (req: Request, res: Response, next: NextFunction) => {
    var grant_type = req.body.grant_type;
    var username = req.body.username;
    var password = req.body.password;
    var refresh_token = req.body.refresh_token;
    var email = req.body.email;

    if (grant_type !== 'password' && grant_type !== 'email' /*&& grant_type !== 'refresh_token'*/) {
        var response = {
            "error": "unsupported_grant_type",
            "error_description": "Unsupported grant type: " + grant_type
        };
        res.status(400).json(response);
    }
    else {
        if (grant_type == 'password' && !(username && password)) {
            res.status(400).json({ message: "Username & Password are required" });
        }
        else if (grant_type == 'refresh_token' && !refresh_token) {
            response = {
                "error": "invalid_grant",
                "error_description": "Invalid refresh token: " + refresh_token,
            };
            res.status(400).json(response);
        }
        else if (grant_type == 'email' && !email) {
            response = {
                "error": "invalid_grant",
                "error_description": "Invalid email",
            };
            res.status(400).json(response);
        }
        else {
            next();
        }
    }
}

export const checkMail = (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;

    if (!email || email == '') {
        var response = config.email_err;
        return res.status(401).json(response);
    }
    else {
        const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(regexpEmail.test(email)) {
            next();
        }
        else {
            var response = config.email_err;
            return res.status(401).json(response);
        }
    }
}

export const checkMessageBug = (req: Request, res: Response, next: NextFunction) => {

    const mensaje = req.body.mensaje ? req.body.mensaje : '';

    if (!mensaje || mensaje == '') {
        var response = config.messageBug_err;
        return res.status(401).json(response);
    }
    else {
        next();
    }
}

export const checkNotificacion = async (req: Request, res: Response, next: NextFunction) => {
    const titulo = req.body.titulo;
    const mensaje = req.body.mensaje;
    const payload = req.body.payload;
    const tokenDevice = req.body.tokenDevice;

    if (!titulo || titulo == '') {
        res.status(401).json({ message: "Debe informar el título de la notificación" });
    }
    else if (!mensaje || mensaje == '') {
        res.status(401).json({ message: "Debe informar el mensaje de la notificación" });
    }
    else if (!payload || payload == '') {
        res.status(401).json({ message: "Debe informar el payload de la notificación" });
    }
    else if (!tokenDevice || tokenDevice == '') {
        res.status(401).json({ message: "Debe informar el tokenDevice de la notificación" });
    }
    else {
        next();
    }
}

export const checkNuevoUsuario = async (req: Request, res: Response, next: NextFunction) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;

    if (!nombre || nombre == '') {
        var response = config.nombre_usuario_err;
        return res.status(401).json(response);
    }
    else {
        if (!password || password == '') {
            var response = config.password_err;
            return res.status(401).json(response);
        }
        else {
            if (!email || email == '') {
                var response = config.email_err;
                return res.status(401).json(response);
            }
            else {
                const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                if (regexpEmail.test(email)) {
                    next();
                }
                else {
                    var response = config.email_err;
                    return res.status(401).json(response);
                }
            }
        }
    }
}

export const checkTokenDevice = (req: Request, res: Response, next: NextFunction) => {

    const tokenDevice = req.body.tokenDevice;

    if (tokenDevice !== undefined && tokenDevice !== '') {
        next();
    }
    else {
        var response = config.token_device_err;
        return res.status(401).json(response);
    }
}

export const checkPassword = (req: Request, res: Response, next: NextFunction) => {

    const password = req.body.password;

    if (password !== undefined && password !== '') {
        next();
    }
    else {
        var response = config.password_err;
        return res.status(401).json(response);
    }
}

export const checkImage = async (req: Request, res: Response, next: NextFunction) => {
    const image = req.body.image;

    if (image !== undefined && image.filename && image.filename !== '' && image.base64 && image.base64 !== '') {
        next();
    }
    else {
        var response = config.image_err;
        return res.status(401).json(response);
    }

}

export const checkUsuario = async (req: Request, res: Response, next: NextFunction) => {
    const nombre = req.body.nombre;
    const email = req.body.email;

    if (!nombre || nombre == '') {
        var response = config.nombre_usuario_err;
        return res.status(401).json(response);
    }
    else {
        if(email) {
            const regexpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(regexpEmail.test(email)) {
                next();
            }
            else {
                var response = config.email_err;
                return res.status(401).json(response);
            }
        }
        else {
            next();
        }
    }
}

export const checkSecurityCode = async (req: Request, res: Response, next: NextFunction) => {
    const security_code = req.body.security_code;

    if (!security_code || security_code == '') {
        var response = config.security_code_err;
        return res.status(401).json(response);
    }
    else {
        next();
    }
}

export const checkPassCode = async (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;
    const security_code = req.body.security_code;
    const email = req.body.email;

    if (!password || password == '') {
        var response = config.password_err;
        return res.status(401).json(response);
    }
    else {
        if (!security_code || security_code == '') {
            var response = config.security_code_err;
            return res.status(401).json(response);
        }
        else {
            if (!email || email == '') {
                var response = config.email_err;
                return res.status(401).json(response);
            }
            else {
                next();
            }
        }
    }
}

export const checkTipoEstado = async (req: Request, res: Response, next: NextFunction) => {
    const tipo = req.query.tipo;

    if (tipo && tipo != "global" && tipo != "cliente" && tipo != "seguro") {
        var response = config.tipo_estado_err;
        return res.status(401).json(response);
    }
    else {
        next();
    }
}

export const checkTicket = async (req: Request, res: Response, next: NextFunction) => {
    const ticket = req.body;

    const contratosRepository = getRepository(Contratos);

    const contratos = await contratosRepository.createQueryBuilder("contratos")
        .where("deleted = 0 AND fk_entity = " + ticket.FK_entities + " AND fecha_vencimiento > " + moment().format('YYYY-MM-DD'))
        .getOne();

    if (ticket.FK_entities == null || ticket.FK_entities == "") {
        var response = config.ticket_err.fk_entities_null;
        return res.status(401).json(response);
    } else {
        if (!contratos) {
            var response = config.ticket_err.contrato_null;
            return res.status(401).json(response);
        } else {
            next();
        }
    }

}

export const checkTteIncidencia = async (req: Request, res: Response, next: NextFunction) => {
    const incidencia = req.body;

    if (!incidencia.fecha_gestion || incidencia.fecha_gestion == null || incidencia.fecha_gestion == '') {
        var response = config.incidencia_err.fecha_gestion;
        return res.status(401).json(response);
    }
    else {
        if (!incidencia.fk_et || incidencia.fk_et < 1) {
            var response = config.incidencia_err.fk_et;
            return res.status(401).json(response);
        }
        else {
            const etRepository = getRepository(EnvioTransporte);
            const et = await etRepository.findOne(incidencia.fk_et);
            if (!et) {
                var response = config.incidencia_err.no_fk_et;
                return res.status(401).json(response);
            }
            else {
                if (!incidencia.tipo || incidencia.tipo < 1) {
                    var response = config.incidencia_err.tipo;
                    return res.status(401).json(response);
                }
                else {
                    const tipoRepository = getRepository(TransporteIncidenciasTipos);
                    const tipo = await tipoRepository.findOne(incidencia.tipo);
                    if (!tipo) {
                        var response = config.incidencia_err.no_tipo;
                        return res.status(401).json(response);
                    }
                    else {
                        if (!incidencia.estado_global || incidencia.estado_global < 1) {
                            var response = config.incidencia_err.estado_global;
                            return res.status(401).json(response);
                        }
                        else {
                            const estadoRepository = getRepository(TransporteIncidenciasEstados);
                            const estado = await estadoRepository.findOne({ where: { id: incidencia.estado_global, tipo: 'global' } });
                            if (!estado) {
                                var response = config.incidencia_err.no_estado_global;
                                return res.status(401).json(response);
                            }
                            else {
                                if (!incidencia.estado_cliente || incidencia.estado_cliente < 1) {
                                    var response = config.incidencia_err.estado_cliente;
                                    return res.status(401).json(response);
                                }
                                else {
                                    const estadoRepository = getRepository(TransporteIncidenciasEstados);
                                    const estado = await estadoRepository.findOne({ where: { id: incidencia.estado_cliente, tipo: 'cliente' } });
                                    if (!estado) {
                                        var response = config.incidencia_err.no_estado_cliente;
                                        return res.status(401).json(response);
                                    }
                                    else {
                                        //El nº expediente, los importes y el estado seguro no son obligatorios
                                        next();
                                        // if(!incidencia.estado_seguro || incidencia.estado_seguro < 1) {
                                        //     var response = config.incidencia_err.estado_seguro;
                                        //     return res.status(401).json(response);
                                        // }
                                        // else {
                                        //     const estadoRepository = getRepository(TransporteIncidenciasEstados);
                                        //     const estado = await estadoRepository.findOne({where:{id:incidencia.estado_seguro, tipo: 'seguro'}});
                                        //     if(!estado) {
                                        //         var response = config.incidencia_err.no_estado_seguro;
                                        //         return res.status(401).json(response);
                                        //     }
                                        //     else {
                                        //         if(!incidencia.num_expediente || incidencia.num_expediente == null || incidencia.num_expediente == '') {
                                        //             var response = config.incidencia_err.num_expediente;
                                        //             return res.status(401).json(response);
                                        //         }
                                        //         else {
                                        //             if(!incidencia.importe_compra || incidencia.importe_compra == null || incidencia.importe_compra == '') {
                                        //                 var response = config.incidencia_err.importe_compra;
                                        //                 return res.status(401).json(response);
                                        //             }
                                        //             else {
                                        //                 if(!incidencia.importe_indemnizacion || incidencia.importe_indemnizacion == null || incidencia.importe_indemnizacion == '') {
                                        //                     var response = config.incidencia_err.importe_indemnizacion;
                                        //                     return res.status(401).json(response);
                                        //                 }
                                        //                 else {
                                        //                     next();
                                        //                 }
                                        //             }
                                        //         }
                                        //     }
                                        // }  
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export const checkMarca = async (req: Request, res: Response, next: NextFunction) => {
    const marcaId = req.query.marcaId ? Number(req.query.marcaId) : 0;
    if (marcaId < 0 || isNaN(marcaId)) {
        var response = config.marca_err;
        return res.status(401).json(response);
    }
    else {
        if(marcaId == 0) {
            next();
        }
        else {
            const repository = getRepository(Manufacturer);
            const manufacturer = await repository.findOne(marcaId);
            if (manufacturer) {
                next();
            }
            else {
                var response = config.marca_err;
                return res.status(401).json(response);
            }
        }
    }
}

export const checkIris = async (req: Request, res: Response, next: NextFunction) => {
    const ticketId = req.query.ticketId ? Number(req.query.ticketId) : 0;
    const marcaId = req.query.marcaId ? Number(req.query.marcaId) : 0;
    const modeloId = req.query.modeloId ? Number(req.query.modeloId) : 0;
    const tipo = req.query.tipo;

    if (tipo == undefined || tipo === "" /*&& tipo !== 'pc' && tipo !== 'laptop' && tipo !== 'tablet' && tipo !== 'smartphone' && tipo !== 'otros'*/) {
        var response = config.tipo_elem_err;
        return res.status(401).json(response);
    }
    else {
        if (ticketId == 0 || isNaN(ticketId)) {
            var response = config.ticket_err.invalid_ticket;
            return res.status(401).json(response);
        }
        else {
            if (marcaId < 0 || isNaN(marcaId)) {
                var response = config.marca_err;
                return res.status(401).json(response);
            }
            else {
                if (modeloId < 0 || isNaN(modeloId)) {
                    var response = config.modelo_err;
                    return res.status(401).json(response);
                }
                else {
                    const marcaRepository = getRepository(Manufacturer);
                    const manufacturer = await marcaRepository.findOne(marcaId);
                    if (!manufacturer) {
                        var response = config.marca_err;
                        return res.status(401).json(response);
                    }
                    else {
                        const modeloRepository = getRepository(DeviceModel);
                        const model = await modeloRepository.findOne(modeloId);
                        if (!model) {
                            var response = config.modelo_err;
                            return res.status(401).json(response);
                        }
                        else {
                            next();
                        }
                    }
                }
            }
        }
    }
}

export const checkTicketMarcaModelo = async (req: Request, res: Response, next: NextFunction) => {
    const ticketId = req.query.ticketId ? Number(req.query.ticketId) : 0;
    const marcaId = req.query.marcaId ? Number(req.query.marcaId) : 0;
    const modeloId = req.query.modeloId ? Number(req.query.modeloId) : 0;

    if (ticketId == 0 || isNaN(ticketId)) {
        var response = config.ticket_err.invalid_ticket;
        return res.status(401).json(response);
    }
    else {
        if (marcaId < 0 || isNaN(marcaId)) {
            var response = config.marca_err;
            return res.status(401).json(response);
        }
        else {
            if (modeloId < 0 || isNaN(modeloId)) {
                var response = config.modelo_err;
                return res.status(401).json(response);
            }
            else {
                const marcaRepository = getRepository(Manufacturer);
                const manufacturer = await marcaRepository.findOne(marcaId);
                if (!manufacturer) {
                    var response = config.marca_err;
                    return res.status(401).json(response);
                }
                else {
                    const modeloRepository = getRepository(DeviceModel);
                    const model = await modeloRepository.findOne(modeloId);
                    if (!model) {
                        var response = config.modelo_err;
                        return res.status(401).json(response);
                    }
                    else {
                        next();
                    }
                }
            }
        }
    }

}

export const checkConfigProjects = (req: Request, res: Response, next: NextFunction) => {
    const nombre = req.body.nombre;
    const listaProyectos = req.body.listaProyectos;

    if (!nombre || nombre == '') {
        var response = config.configProjets.nombre_err;
        return res.status(401).json(response);
    }
    else {
        if (!listaProyectos || listaProyectos == '') {
            var response = config.configProjets.listaProyectos_err;
            return res.status(401).json(response);
        }
        else {
            next();
        }
    }
}

export const checkFiltroSap = (req: Request, res: Response, next: NextFunction) => {
    const almacen = req.query.almacen ? req.query.almacen : '';
    const pn = req.query.pn ? req.query.pn : '';
    const sn = req.query.sn ? req.query.sn : '';
    const sni = req.query.sni ? req.query.sni : '';
    const anyns = req.query.anyns ? req.query.anyns : '';
    const fecha = req.query.fecha ? req.query.fecha.toString() : '';

    if (almacen == '' && pn == '' && sn == '' && sni == '') {
        if (fecha) {
            var response = config.sapError.filtro_date_alm_err;
            return res.status(401).json(response);
        }
        else {
            var response = config.sapError.filtro_err;
            return res.status(401).json(response);
        }
    }
    else {
        if (anyns && anyns != 'S' && anyns != 'N') {
            var response = config.sapError.anyns_err;
            return res.status(401).json(response);
        }
        else {
            if (fecha && !moment(fecha, "YYYY-MM-DD", true).isValid()) {
                var response = config.sapError.filtro_date_err;
                return res.status(401).json(response);
            }
            else {
                next();
            }
        }
    }
}

export const checkFiltroArticulos = async (req: Request, res: Response, next: NextFunction) => {
    const marca = req.query.marca ? Number(req.query.marca) : 0;
    const modelo = req.query.modelo ? Number(req.query.modelo) : 0;
    const family = req.query.familia ? Number(req.query.familia) : 0;
    const tipo = req.query.tipo ? Number(req.query.tipo) : 0;
    const medida = req.query.medida ? req.query.medida : '';

    if (marca < 0 || isNaN(marca)) {
        var response = config.marca_err;
        return res.status(401).json(response);
    }
    else {
        if (modelo < 0 || isNaN(modelo)) {
            var response = config.modelo_err;
            return res.status(401).json(response);
        }
        else {
            if (family < 0 || isNaN(family)) {
                var response = config.familia_err;
                return res.status(401).json(response);
            }
            else {
                if (tipo < 0 || isNaN(tipo)) {
                    var response = config.tipo_disp_err;
                    return res.status(401).json(response);
                }
                else {
                    if (medida && medida !== 'U' && medida !== 'P') {
                        var response = config.medida_err;
                        return res.status(401).json(response);
                    }
                    else {
                        next();
                    }
                }
            }
        }
    }
}


export const checkMovimientosArticulo = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const movimientosRepository = getRepository(AlmacenesMovimientos);
    const movimientos = await movimientosRepository.createQueryBuilder("movimientos")
        .where("deleted = 0 AND id_inventario = " + id)
        .getOne();

    if (movimientos) {
        var response = config.existe_mov_err;
        return res.status(401).json(response);
    }
    else {
        next();
    }
}

export const checkNewArticulo = async (req: Request, res: Response, next: NextFunction) => {

    const pn = req.body.pn;
    const dispositivo = req.body.dispositivo ? Number(req.body.dispositivo) : 0;
    const marca = req.body.marca ? Number(req.body.marca) : 0;
    const modelo = req.body.modelo ? Number(req.body.modelo) : 0;
    const familia = req.body.familia ? Number(req.body.familia) : 0;
    const medida = req.body.medida ? req.body.medida : '';

    if (pn) {
        const articulosRepository = getRepository(ElementoInventario);
        const articulo = await articulosRepository.createQueryBuilder("articulo")
            .where("deleted = 0 AND PN = '" + pn.trim() + "'")
            .getOne();

        if (articulo) {
            var response = config.existe_pn_err;
            return res.status(401).json(response);
        }
        else {
            if (!await checkMarcaExiste(marca)) {
                var response = config.marca_err;
                return res.status(401).json(response);
            }
            else {
                if (!await checkModeloExiste(marca, modelo)) {
                    var response = config.modelo_err;
                    return res.status(401).json(response);
                }
                else {
                    if (!await checkFamiliaExiste(familia)) {
                        var response = config.familia_err;
                        return res.status(401).json(response);
                    }
                    else {
                        if (!await checkTipoDispositivoExiste(dispositivo)) {
                            var response = config.tipo_disp_err;
                            return res.status(401).json(response);
                        }
                        else {
                            if (medida && medida !== 'U' && medida !== 'P') {
                                var response = config.medida_err;
                                return res.status(401).json(response);
                            }
                            else {
                                next();
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        var response = config.pn_err;
        return res.status(401).json(response);
    }
}

async function checkMarcaExiste(marca) {
    if (marca < 0 || isNaN(marca)) {
        return false;
    }
    else if (marca == 0) {
        return true;
    }
    else {
        const marcaRepository = getRepository(Manufacturer);
        const manufacturer = await marcaRepository.findOne({ where: { id: marca, deleted: 0 } });
        if (manufacturer) {
            return true;
        }
        else {
            return false;
        }
    }
}

async function checkModeloExiste(marca, modelo) {
    if (marca < 0 || isNaN(marca)) {
        return false;
    }
    else {
        if (modelo < 0 || isNaN(modelo)) {
            return false;
        }
        else {
            if (marca == 0 && modelo == 0) {
                return true;
            }
            else if (marca > 0 && modelo == 0) {
                return true;
            }
            else if (marca == 0 && modelo > 0) {
                return false;
            }
            else {
                const modeloRepository = getRepository(DeviceModel);
                const model = await modeloRepository.createQueryBuilder("models")
                    .where("deleted = 0 AND manufacturer_id = " + marca)
                    .getOne();
                if (model) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
}

async function checkFamiliaExiste(familia) {
    if (familia < 0 || isNaN(familia)) {
        return false;
    }
    else if (familia == 0) {
        return true;
    }
    else {
        const familiaRepository = getRepository(FamiliaProductos);
        const family = await familiaRepository.findOne({ where: { id: familia, deleted: 0 } });
        if (family) {
            return true;
        }
        else {
            return false;
        }
    }
}

async function checkTipoDispositivoExiste(dispositivo) {
    if (dispositivo < 0 || isNaN(dispositivo)) {
        return false;
    }
    else if (dispositivo == 0) {
        return true;
    }
    else {
        const dispositivoRepository = getRepository(TipoDispositivo);
        const tipo = await dispositivoRepository.findOne({ where: { id: dispositivo, deleted: 0 } });
        if (tipo) {
            return true;
        }
        else {
            return false;
        }
    }
}


export const checkUpdateArticulo = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const pn = req.body.pn;
    const dispositivo = req.body.dispositivo ? Number(req.body.dispositivo) : 0;
    const marca = req.body.marca ? Number(req.body.marca) : 0;
    const modelo = req.body.modelo ? Number(req.body.modelo) : 0;
    const familia = req.body.familia ? Number(req.body.familia) : 0;
    const medida = req.body.medida ? req.body.medida : '';

    if (pn) {
        const articulosRepository = getRepository(ElementoInventario);
        const articulo = await articulosRepository.createQueryBuilder("articulo")
            .where("deleted = 0 AND PN = '" + pn.trim() + "' AND id != " + id)
            .getOne();

        if (articulo) {
            var response = config.existe_pn_err;
            return res.status(401).json(response);
        }
        else {
            if (!await checkMarcaExiste(marca)) {
                var response = config.marca_err;
                return res.status(401).json(response);
            }
            else {
                if (!await checkModeloExiste(marca, modelo)) {
                    var response = config.modelo_err;
                    return res.status(401).json(response);
                }
                else {
                    if (!await checkFamiliaExiste(familia)) {
                        var response = config.familia_err;
                        return res.status(401).json(response);
                    }
                    else {
                        if (!await checkTipoDispositivoExiste(dispositivo)) {
                            var response = config.tipo_disp_err;
                            return res.status(401).json(response);
                        }
                        else {
                            if (!await checkMedidaArticulo(id, medida)) {
                                var response = config.medida_mov_err;
                                return res.status(401).json(response);
                            }
                            else {
                                next();
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        var response = config.pn_err;
        return res.status(401).json(response);
    }
}

async function checkMedidaArticulo(id, medida) {
    if (medida && medida !== 'U' && medida !== 'P') {
        return false;
    }
    else {
        const articulosRepository = getRepository(ElementoInventario);
        const articulo = await articulosRepository.findOne(id);
        if (articulo.tipo_medida != medida) {
            const movimientosRepository = getRepository(AlmacenesMovimientos);
            const movimientos = await movimientosRepository.createQueryBuilder("movimientos")
                .where("deleted = 0 AND id_inventario = " + id)
                .getOne();

            if (movimientos) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }
}


export const checkArticuloId = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;

    const articulosRepository = getRepository(ElementoInventario);
    const articulo = await articulosRepository.findOne({ where: { ID: id, deleted: 0 } });

    if (articulo) {
        next();
    }
    else {
        var response = config.no_articulo_err;
        return res.status(401).json(response);
    }
}

export const checkFiltroAlmacen = (req: Request, res: Response, next: NextFunction) => {
    const filtro = req.query.filtro ? req.query.filtro : '';

    if (filtro == '') {
        var response = config.sapError.filtro_err;
        return res.status(401).json(response);
    }
    else {
        next();
    }
}

export const checkFiltroTotalElementos = (req: Request, res: Response, next: NextFunction) => {
    var almacen = req.query.almacen ? req.query.almacen : '';
    var pn = req.query.pn ? req.query.pn : '';

    if (almacen == '' || pn == '') {
        var response = config.sapError.filtro_total_err;
        return res.status(401).json(response);
    }
    else {
        next();
    }
}

export const checkPais = (req: Request, res: Response, next: NextFunction) => {

    const idPais = req.query.pais ? Number(req.query.pais) : 0;

    if (idPais < 0 || isNaN(idPais)) {
        var response = config.pais_err;
        return res.status(401).json(response);
    }
    else {
        next();
    }
}


export const checkCentroconocimiento = async (req: Request, res: Response, next: NextFunction) => {
    const ticketId = req.query.ticketId ? Number(req.query.ticketId) : 0;
    const tipo = req.query.tipo;
    const marcaId = Number(req.query.marcaId);
    const modeloId = Number(req.query.modeloId);

    if (ticketId == 0 || isNaN(ticketId)) {
        var response = config.ticket_err.invalid_ticket;
        return res.status(401).json(response);
    }
    else {
        if(tipo && tipo !== 'VID' && tipo !== 'DOC') {
            var response = config.tipo_cc_err;
            return res.status(401).json(response);
        }
        if (marcaId && (marcaId < 0 || isNaN(marcaId))) {
            var response = config.marca_err;
            return res.status(401).json(response);
        }
        else {
            if (modeloId && (modeloId < 0 || isNaN(modeloId))) {
                var response = config.modelo_err;
                return res.status(401).json(response);
            }
            else {
                next();
            }
        }
    }

}

export const checkJerarquia = async (req: Request, res: Response, next: NextFunction) => {
    const pn_padre = Number(req.body.pn_padre);
    const pn_hijo = Number(req.body.pn_hijo);

    if (!pn_padre || !pn_hijo) {
        var response = config.no_pn_err;
        return res.status(401).json(response);
    }
    else {
        const elementoRepository = getRepository(ElementoInventario);
        const pnpadre = await elementoRepository.findOne(pn_padre);
        const pnhijo = await elementoRepository.findOne(pn_hijo);

        if(!pnpadre || ! pnhijo) {
            var response = config.no_pn_err;
            return res.status(401).json(response);
        }
        else {
            const jerarquiaRepository = getRepository(ElementoInventarioJerarquia);
            const jerarquia = await jerarquiaRepository.createQueryBuilder('jerarquia')
                    .where("pn_padre = " + pn_padre + " AND pn_hijo = " + pn_hijo)
                    .andWhere("deleted = 0")
                    .getOne();
            
            if(jerarquia) {
                var response = config.jerarquia_err;
                return res.status(401).json(response);
            }
            else {
                next();
            }
        }
    }

}

export const checkCompatibilidad = async (req: Request, res: Response, next: NextFunction) => {
    const pn1 = Number(req.body.pn1);
    const pn2 = Number(req.body.pn2);

    if (!pn1 || !pn2) {
        var response = config.no_pn_err;
        return res.status(401).json(response);
    }
    else {
        const elementoRepository = getRepository(ElementoInventario);
        const pnUno = await elementoRepository.findOne(pn1);
        const pnDos = await elementoRepository.findOne(pn2);

        if(!pnUno || ! pnDos) {
            var response = config.no_pn_err;
            return res.status(401).json(response);
        }
        else {
            const compatibilidadRepository = getRepository(ElementoInventarioCompatibilidad);
            const compatibilidad = await compatibilidadRepository.createQueryBuilder('compatibilidad')
                    .where("((pn1 = " + pn1 + " AND pn2 = " + pn2 + ") OR (pn1 = " + pn2 + " AND pn2 = " + pn1 + "))")
                    .andWhere("deleted = 0")
                    .getOne();

            if(compatibilidad) {
                var response = config.compatibilidad_err;
                return res.status(401).json(response);
            }
            else {
                next();
            }
        }
    }
}

export const checkFiltroCliente = (req: Request, res: Response, next: NextFunction) => {
    const filtro = req.query.filtro ? req.query.filtro : '';

    if (filtro == '') {
        var response = config.filtro_cliente_err;
        return res.status(401).json(response);
    }
    else {
        next();
    }
}