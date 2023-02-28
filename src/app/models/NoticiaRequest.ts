import { Etiqueta } from './Etiqueta';
import { Imagen } from "./Imagen";

//Interfaz alternativa para los objetos noticias, para trabajar con los request de la API y poder 
//obtener las relaciones existentes (Imagen)
export interface NoticiaRequest {
    idnoticias: String;
    tituloNoticia: String;
    contenidoNoticia: String;
    usuario: String;
    fechaCreacion: String;
    fechaPublicacion: String;
    esPortada: Boolean;
    imagen: Imagen;
    etiquetas: Etiqueta[];
  }