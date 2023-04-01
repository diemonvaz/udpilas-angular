import { Equipo } from "./Equipo";
import { Jugador } from "./Jugador";
import { Miembro } from "./Miembro";

export interface Entrenamiento {
    identrenamientos: String;
    fecha: string;
    observaciones: String;
    miembro: Miembro;
    equipo: Equipo;
    jugadores: Jugador[];
}