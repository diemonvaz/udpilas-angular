import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, JoinColumn, BaseEntity} from "typeorm";
import { Usuarios } from "./Usuarios";


@Entity("miembros")
@Unique(['idmiembro'])
export class Miembros extends BaseEntity{

    @PrimaryGeneratedColumn()
    idmiembro: number;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    domicilio: string;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    poblacion: string;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    dni: string;

    @OneToOne(() => Usuarios)
    @JoinColumn()
    usuario: Usuarios;
  
}