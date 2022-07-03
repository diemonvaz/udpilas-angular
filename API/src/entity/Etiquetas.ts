import {Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity} from "typeorm";

@Entity("etiquetas")
@Unique(['idetiquetas'])
export class Etiquetas extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    idetiquetas: number;

    @Column({type: "text", nullable: false})
    nombre: string;


}