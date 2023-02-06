import {Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, JoinTable, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Roles } from "./Roles";

@Entity("miembros")
@Unique(['idmiembro'])
export class Usuarios {

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