import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Equipos } from "./Equipos";
import { Jugadores } from "./Jugadores";
import { Miembros } from "./Miembros";

@Entity("entrenamientos")
@Unique(['identrenamientos'])
export class Entrenamientos extends BaseEntity {

    @PrimaryGeneratedColumn()
    identrenamientos: number;

    @Column({type: "datetime", nullable: false})
    fecha: Date;

    @Column({type: "longtext", width: 255, default: null, nullable: true})
    observaciones: string;

    //miembro que ha llevado a cabo la sesion de entreno. (Ya que no tiene porqué ser siempre el entrenador)
    @ManyToOne(() => Miembros, {
        eager:true
    })
    miembro: Miembros;

    @ManyToOne(() => Equipos, {
        eager: true
    })
    equipo: Equipos;

    @ManyToMany(type => Jugadores, jugador => jugador.entrenamientos, {
        eager: true,
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    jugadores: Jugadores[];


}