import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity("etiquetas")
@Unique(['idetiquetas'])
export class Etiquetas {
    
    @PrimaryGeneratedColumn()
    idetiquetas: number;

    @Column({type: "text", nullable: false})
    nombre: string;


}