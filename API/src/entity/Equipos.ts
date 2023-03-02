import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Jugadores } from './Jugadores';

@Entity("equipos")
@Unique(['idequipos'])
export class Equipos extends BaseEntity{

    @PrimaryGeneratedColumn()
    idequipos: number;

    @Column({type: "varchar", width: 255, default: null, nullable: false})
    nombre: string;

    /*este oneToMany es opcional, con tener el manyToOne en la otra entidad basta,
    pero nos puede ser util para que, si cargamos un equipo, nos venga con la lista de sus jugadores asociados */
    @OneToMany(() => Jugadores, (jugador) => jugador.equipo)
    jugadores: Jugadores[];

}