import { Rol } from "./Rol";
import { Usuario } from "./Usuario";

export interface Miembro {
    idmiembro: String;
    domicilio: String;
    poblacion: String;
    dni: String;
    usuario: Usuario;
    roles: Rol[];
   
}