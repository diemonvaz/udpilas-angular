import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Jugadores } from "./Jugadores";

@Entity("registros_corporales")
@Unique(['idregistros_corporales'])
export class RegistrosCorporales extends BaseEntity{

    @PrimaryGeneratedColumn()
    idregistros_corporales: number;

    @Column({nullable: true})
    altura: number;

    @Column({type: "decimal", nullable: true})
    peso: number;

    @Column({type: "decimal", nullable: true})
    imc: number;

    @Column({type: "decimal", nullable: true})
    masa_muscular: number;

    @Column({type: "decimal", nullable: true})
    masa_osea: number;

    @Column({nullable: true})
    TMB: number;

    @Column({type: "decimal", nullable: true})
    agua: number;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    observaciones: string;

    @Column({type: "date", nullable: false})
    fecha: Date;

    //valorar ponerle eager = true para que siempre carge todas las relaciones, sin tener que especificar en el queryBuilder
    @ManyToOne(() => Jugadores,  (jugador) => jugador.registros)
    jugador: Jugadores;

}