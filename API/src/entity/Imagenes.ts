import { Noticias } from './Noticias';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity("imagenes")
@Unique(["idimagenes"])
export class Imagenes extends BaseEntity{
  
    @PrimaryGeneratedColumn()
    idimagenes: number;

    @Column({type: "text", nullable: false})
    nombre: string;
   
    @ManyToMany(type => Noticias, noticia => noticia.imagenes)
    @JoinTable()
    noticiasMTM: Noticias[];

}