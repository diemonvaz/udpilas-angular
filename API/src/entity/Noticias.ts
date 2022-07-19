import { Imagenes } from './Imagenes';
import { Etiquetas } from './Etiquetas';
import {Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, JoinTable, BaseEntity, ManyToOne} from "typeorm";

@Entity("noticias")
@Unique(["idnoticias"])
export class Noticias extends BaseEntity{

    @PrimaryGeneratedColumn()
    idnoticias: number;

    @Column({type: "text", nullable: true})
    tituloNoticia: string;

    @Column({type: "text", nullable: false})
    contenidoNoticia: string;

    @Column({type: "text", nullable: true})
    usuario: string;

    @Column({type: "date", nullable: false})
    fechaCreacion: Date;

    @Column({type: "date", nullable: true})
    fechaPublicacion: Date;

    @Column({type: "bool", nullable: false})
    esPortada: Boolean;

    @ManyToOne(type => Imagenes, imagen => imagen.noticias)
    imagen: Imagenes;

    @ManyToMany(type => Imagenes, imagen => imagen.noticiasMTM)
    @JoinTable()
    imagenes: Imagenes[];

    @ManyToMany(type => Etiquetas, etiqueta => etiqueta.noticias)
    @JoinTable()
    etiquetas: Etiquetas[];

   

}