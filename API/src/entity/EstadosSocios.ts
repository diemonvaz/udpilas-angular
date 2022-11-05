import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Socios } from "./Socios";

@Entity("estados_socios")
@Unique(['idestados_socios'])
export class EstadosSocios extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    idestados_socios: number;

    @Column({type: "text", nullable: false})
    codigo: string;

    @Column({type: "text", nullable: false})
    descripcion: string;

    @OneToMany(() => Socios, (socio) => socio.estado_2223)
    socios: Socios[]

}