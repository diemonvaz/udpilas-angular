import { Jugador } from "./Jugador";

export interface Equipo {
    idequipos: String;
    nombre: String;
    jugadores: Jugador[];
}