import { Socio } from "./Socio";

export interface TipoAbono {
    idtipos_carnet: Number;
    tipo: String;
    precio: Number;
    socios: Socio[];
}