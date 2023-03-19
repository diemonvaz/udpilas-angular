import { RegistrosCorporalesController } from './../../../API/src/controller/RegistrosCorporalesController';
import { Imagen } from "./Imagen";
import { RegistroCorporal } from './RegistroCorporal';

export interface Jugador {
    idjugadores: String;
    nombre: String;
    apellidos: String;
    fecha_nacimiento: String;
    posicion: String;
    dni: String;
    reconocimiento_medico: String;
    duracion: String;
    imagen: Imagen;
    registros: RegistroCorporal[];

}