import {Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, ManyToMany, JoinTable} from "typeorm";
import { Noticias } from "./Noticias";

@Entity("etiquetas")
@Unique(['idetiquetas'])
export class Etiquetas extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    idetiquetas: number;

    @Column({type: "text", nullable: false})
    nombre: string;

    @ManyToMany(type => Noticias, noticia => noticia.etiquetas)
    @JoinTable()
    noticias: Noticias[];
}