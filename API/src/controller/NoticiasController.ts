import {getRepository} from "typeorm";
import { Request, Response} from "express";
import { Noticias } from "../entity/Noticias";
import { Etiquetas } from "../entity/Etiquetas";
import { Imagenes } from "../entity/Imagenes";


export class NoticiasController {

    static getById = async (req: Request, res: Response)=>{

        const id = req.params.id;
        const repository = getRepository(Noticias);
        try{
            const noticia = await repository.createQueryBuilder("noticia")
                    .where("noticia.idnoticias = :id", { id: id})
                    .leftJoinAndSelect("noticia.imagen", "imagen").leftJoinAndSelect("noticia.etiquetas", "etiquetas")
                    .getOne();
            if(noticia) {
                console.log(noticia);
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

    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Noticias);
        try {
            const noticia = await repository.createQueryBuilder("noticia")
                    .leftJoinAndSelect("noticia.imagen", "imagen").leftJoinAndSelect("noticia.etiquetas", "etiquetas")
                    .orderBy("noticia.fechaPublicacion", "DESC")
                    .getMany();
            console.log(noticia);
            if(noticia) {
                res.send(noticia);
            }
            else {
                res.status(404).json({message: 'Error al realizar GET sobre Noticias'});
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
                urlImagen,
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
                imagen: urlImagen,
                imagenes: imagenes
            });
            //tratamos imagen principal para evitar duplicidades en caso de usarse en varias noticias a la vez
            //a diferencia de los manyToMany, tenemos que asignar el id de la imagen principal a la noticia antes
            //de guardarla, ya que es foreing key hacia la tabla imagenes.
            
            const aux3 = await Imagenes.findOne({nombre: urlImagen});
            if(aux3==null){
                let e3 = Imagenes.create();
                e3.nombre = urlImagen;
                await e3.save();
                noticia.imagen = e3;
            }else{
                noticia.imagen = aux3;
            }

            await noticia.save();
           //tratamos etiquetas para evitar duplicidades en las tablas de relaciones
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

            //tratamos imagenes para evitar duplicidades en las tablas de relaciones
            let imagenesTotales: Imagenes[] = [];
            for (let i = 0; i < imagenes.length; i++) {
                console.log(imagenes[i].nombre);
                const aux2 = await Imagenes.findOne({nombre: imagenes[i].nombre}); 
                if(aux2==null) { 
                    let e2 = Imagenes.create();
                    e2.nombre = imagenes[i].nombre;
                    await e2.save();
                    imagenesTotales.push(e2);
                }else{
                    imagenesTotales.push(aux2);
                }
            }
            noticia.imagenes = imagenesTotales;
            await noticia.save();
        
            return res.json(noticia);
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
        
    };

    
   
}


export default NoticiasController;