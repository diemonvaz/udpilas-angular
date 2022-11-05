import { EstadosSocios } from './EstadosSocios';
import {Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { TiposAbono } from "./TiposAbono";


@Entity("socios")
@Unique(['idsocio'])
export class Socios extends BaseEntity{

    @PrimaryGeneratedColumn()
    idsocio: number;
    
    @Column({type: "text", nullable: false})
    nombre_completo: string;
    
    @Column({type: "text", nullable: false})
    domicilio: string;

    @Column({type: "text", nullable: false})
    poblacion: string;

    @Column({type: "text", nullable: false})
    telefono: string;

    @Column({type: "text", nullable: false})
    correo_electronico: string;

    @Column({type: "date", nullable: false})
    fecha_nacimiento: Date;

    @Column({type: "text", nullable: false})
    dni: string;

    //valorar podnerle eager = true para que siempre carge todas las relaciones, sin tener que especificar en el queryBuilder
    @ManyToOne(() => TiposAbono, (tipo) => tipo.socios)
    tipo_abono: TiposAbono;

    @ManyToOne(() => EstadosSocios, (estado) => estado.socios)
    estado_2223: EstadosSocios;


}