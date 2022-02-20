import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity("socios")
@Unique(['n_socio'])
export class Socios {

    @PrimaryGeneratedColumn()
    n_socio: number;
    
    @Column({type: "text", nullable: false})
    nombre_completo: string;
    
    @Column({type: "text", nullable: false})
    domicilio: string;

    @Column({type: "text", nullable: false})
    poblacion: string;

    @Column({type: "text", nullable: false})
    telefono: string;

    @Column({type: "text", nullable: false})
    correo_electronico: string;

    @Column({type: "text", nullable: false})
    fecha_nacimiento: string;

    @Column({type: "text", nullable: false})
    dni: string;

    @Column({type: "text", nullable: false})
    tipo_carnet: string;

}