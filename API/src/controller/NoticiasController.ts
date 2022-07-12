import {getRepository} from "typeorm";
import { Request, Response} from "express";
import { Noticias } from "../entity/Noticias";



export class NoticiasController {

    static getById = async (req: Request, res: Response)=>{

        const id = req.params.id;
        const repository = getRepository(Noticias);
        try{
            const noticia = await repository.findOne(id);
            if(noticia) {
                res.send(noticia);
            }
            else {
                res.status(404).json({message: 'Noticia no encontrada'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };


    static postNoticia = async (req: Request, res: Response)=>{
        try {
            const {
                tituloNoticia,
                contenidoNoticia,
                usuario,
                fechaCreacion,
                fechaPublicacion,
                etiquetas
            } = req.body;
            //await funcion auxiliar para checkear si las etiquetas ya están en BD
            const noticia = Noticias.create({
                tituloNoticia: tituloNoticia,
                contenidoNoticia: contenidoNoticia,
                usuario: usuario,
                fechaCreacion: fechaCreacion,
                fechaPublicacion: fechaPublicacion,
                etiquetas: etiquetas
            });
            await noticia.save();
            return res.json(noticia);
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
        
    };

    
   
}


export default NoticiasController;