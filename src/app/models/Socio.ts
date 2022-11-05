import { EstadoSocio } from './EstadoSocio';
import { TipoAbono } from './TipoAbono';
export interface Socio{
    idsocio: String;
    nombre_completo: String;
    domicilio: String;
    poblacion: String;
    telefono: String;
    correo_electronico: String;
    fecha_nacimiento: String;
    dni: String;
    tipo_abono: TipoAbono;
    estado_2223: EstadoSocio;
} 