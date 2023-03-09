import { RegistrosCorporales } from './RegistrosCorporales';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Equipos } from "./Equipos";
import { Imagenes } from "./Imagenes";

@Entity("jugadores")
@Unique(['idjugadores'])
export class Jugadores extends BaseEntity{

    @PrimaryGeneratedColumn()
    idjugadores: number;

    @Column({type: "varchar", width: 255, default: null, nullable: false})
    nombre: string;

    @Column({type: "varchar", width: 255, default: null, nullable: false})
    apellidos: string;

    @Column({type: "date", nullable: false})
    fecha_nacimiento: Date;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    observaciones: string;
  
    @Column({type: "varchar", width: 255, default: null, nullable: true})
    posicion: string;

    //valorar ponerle eager = true para que siempre carge todas las relaciones, sin tener que especificar en el queryBuilder
    @ManyToOne(() => Equipos,  (equipo) => equipo.jugadores)
    equipo: Equipos;
    
    @Column({type: "varchar", width: 255, default: null, nullable: false})
    dni: string;
    
    @Column({type: "date", nullable: true})
    reconocimiento_medico: Date;

    @Column({type: "date", nullable: true})
    duracion: Date;

    @OneToOne(() => Imagenes, {
        eager: true,
        cascade: true,
    })
    @JoinColumn()
    imagen: Imagenes;

    /*este oneToMany es opcional, con tener el manyToOne en la otra entidad basta,
    pero nos puede ser util para que, si cargamos un jugador, nos venga con la lista de sus registros corporales */
    @OneToMany(() => RegistrosCorporales, (reg) => reg.jugador, {
        eager: true,
    })
    registros: RegistrosCorporales[];

}