import {getRepository} from "typeorm";
import { Request, Response} from "express";
import { Noticias } from "../entity/Noticias";
import { Etiquetas } from "../entity/Etiquetas";



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
                etiquetas,
                esPortada,
                imagen,
                imagenes
            } = req.body;
            console.log(req.body);
            const noticia = Noticias.create({
                tituloNoticia: tituloNoticia,
                contenidoNoticia: contenidoNoticia,
                usuario: usuario,
                fechaCreacion: fechaCreacion,
                fechaPublicacion: fechaPublicacion,
                etiquetas: etiquetas,
                esPortada: esPortada,
                imagen: imagen,
                imagenes: imagenes
            });
            await noticia.save();
           
            let etiquetasTotales: Etiquetas[] = [];
            for (let i = 0; i < etiquetas.length; i++) {
                console.log(etiquetas[i].nombre);
                const aux = await Etiquetas.findOne({nombre: etiquetas[i].nombre}); 
                if(aux==null) { //si es una etiqueta nueva que no se encuentra en BD
                    let e1 = Etiquetas.create();
                    e1.nombre = etiquetas[i].nombre;
                    await e1.save();
                    etiquetasTotales.push(e1);
                }else{
                    etiquetasTotales.push(aux);
                }
            }
            noticia.etiquetas = etiquetasTotales;
            await noticia.save();
            
            return res.json(noticia);
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
        
    };

    
   
}


export default NoticiasController;