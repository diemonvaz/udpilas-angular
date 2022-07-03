import { Etiqueta } from "./Etiqueta";

//interfaz con las propiedades requeridas de la noticia
export interface Noticia {
    tituloNoticia: String;
    contenidoNoticia: String;
    usuario: String;
    fechaCreacion: String;
    fechaPublicacion: String;
    etiquetas: Etiqueta[];
  }