import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity("roles")
@Unique(['idroles'])
export class Roles extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    idroles: number;

    @Column({type: "text", nullable: false})
    codigo: string;

    @ManyToMany(type => Usuarios, usuario => usuario.roles)
    usuarios: Usuarios[];
}