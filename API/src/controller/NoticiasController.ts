import {getRepository, In} from "typeorm";
import { Request, Response} from "express";
import { Noticias } from "../entity/Noticias";
import { Etiquetas } from "../entity/Etiquetas";
import { Imagenes } from "../entity/Imagenes";


export class NoticiasController {


    static getAll = async (req: Request, res: Response)=>{
        const repository = getRepository(Noticias);
        try {
            const noticia = await repository.createQueryBuilder("noticia")
                    .leftJoinAndSelect("noticia.imagen", "imagen").leftJoinAndSelect("noticia.etiquetas", "etiquetas")
                    .orderBy("noticia.fechaPublicacion", "DESC")
                    .getMany();
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



    static getById = async (req: Request, res: Response)=>{

        const id = req.params.id;
        const repository = getRepository(Noticias);
        try{
            const noticia = await repository.createQueryBuilder("noticia")
                    .where("noticia.idnoticias = :id", { id: id})
                    .leftJoinAndSelect("noticia.imagen", "imagen").leftJoinAndSelect("noticia.etiquetas", "etiquetas")
                    .getOne();
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


    //En getByTitulo tenemos que aplicar alguna medida de seguridad extra, sanetizar la query para evitar sql injection 
    //aunque en el peor de los casos aqui solo podrian sacar informacion de otras noticias, no de usuarios

    static getByTitulo = async (req: Request, res: Response)=>{
        const tituloNoticia = req.params.tituloNoticia;
        const repository = getRepository(Noticias);
        try{
            const noticia = await repository.createQueryBuilder("noticia")
                    .where("noticia.tituloNoticia like :tituloNoticia", { tituloNoticia: `%${tituloNoticia}%`})
                    .leftJoinAndSelect("noticia.imagen", "imagen").leftJoinAndSelect("noticia.etiquetas", "etiquetas")
                    .getMany();
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

    static getByEtiqueta = async (req: Request, res: Response)=>{
        const etiqueta = req.params.etiqueta;
        const repository = getRepository(Noticias);
        console.log(etiqueta);
        try{
            const noticia = await repository.createQueryBuilder("noticia")
                    .leftJoinAndSelect("noticia.imagen", "imagen").leftJoinAndSelect("noticia.etiquetas", "etiquetas")
                    .where('etiquetas.nombre = :etiqueta', { etiqueta: etiqueta})
                    .getMany();
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

    static getUltimasInsertadas = async (req: Request, res: Response)=>{
        const num = req.params.num;
        var y: number = +num;
        const repository = getRepository(Noticias);
        try {
            const noticia = await repository.createQueryBuilder("noticia")
                    .leftJoinAndSelect("noticia.imagen", "imagen").leftJoinAndSelect("noticia.etiquetas", "etiquetas")
                    .orderBy("noticia.idnoticias", "DESC")
                    .getMany();
            let arrayRes: Noticias[] = [];
            for (let k = 0; k <= y; k++) {
                arrayRes.push(noticia[k]);
            }
            console.log(arrayRes);
            if(arrayRes) {
                res.send(arrayRes);
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
                imagen: urlImagen
            });

            //en caso de que sea portada, buscamos las noticias portada en BBDD. Si hay menos de 3, insertamos. Si hay 3 o más,
            //le quitamos el true de portada a la más antigua e insertamos la nueva
            const noticiasRepo = await Noticias.getRepository();
            const noticiasPortada = noticiasRepo.createQueryBuilder("noticia")
            .where('esPortada = :portada', { portada: true})
            .orderBy("noticia.idnoticias", "DESC")
            .getMany();
            if((await noticiasPortada).length > 2) {
                let popped = (await noticiasPortada).pop();
                popped.esPortada = false;
                await popped.save();
            }
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
            return res.json(noticia);
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
        
    };

    static updateById= async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Noticias);
        try{
            const noticia = await repository.findOne(id, { relations: ['imagen', 'etiquetas'] });
            if(noticia) {
                noticia.tituloNoticia = req.body.tituloNoticia;
                noticia.contenidoNoticia = req.body.contenidoNoticia;
                noticia.fechaPublicacion = req.body.fechaPublicacion;
                noticia.esPortada = req.body.esPortada;
                const checkImagen = await Imagenes.findOne({nombre: req.body.urlImagen});
                if(checkImagen==null){
                    let nuevaImagen = Imagenes.create();
                    nuevaImagen.nombre = req.body.urlImagen;
                    await nuevaImagen.save();
                    noticia.imagen = nuevaImagen;
                }else{
                    noticia.imagen = checkImagen;
                }
               
                const etiquetasNombres = [];
                req.body.etiquetas.forEach(etiqueta => {
                    etiquetasNombres.push(etiqueta.nombre);
                });
                const etiquetasNuevas = [];
                console.log(req.body.etiquetas)
                for (const nombre of etiquetasNombres) {
                    const etiqueta = await Etiquetas.findOne({ nombre });
                    if (etiqueta) {
                        etiquetasNuevas.push(etiqueta);
                    } else {
                        const nuevaEtiqueta = Etiquetas.create();
                        nuevaEtiqueta.nombre = nombre;
                        await nuevaEtiqueta.save();
                        etiquetasNuevas.push(nuevaEtiqueta);
                    }
                }
                noticia.etiquetas = etiquetasNuevas;
            
                await repository.save(noticia);          
            }
            else {
                res.status(404).json({message: 'Noticia no encontrada'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };

    static deleteById = async (req: Request, res: Response)=>{
        const id = req.params.id;
        const repository = getRepository(Noticias);
        try{
            const noticia = await repository.findOne(id);
            if(noticia) {
                await repository.remove(noticia); 
                res.status(200);
            }
            else {
                res.status(404).json({message: 'Noticia no encontrada'});
            }
        }catch(e){
            console.log(e);
            res.status(500).json({message: 'Error'});
        }
    };

    
   
}


export default NoticiasController;