import {Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, OneToMany} from "typeorm";
import { Socios } from "./Socios";


@Entity("tipos_abono")
@Unique(['idtipos_abono'])
export class TiposAbono extends BaseEntity {

    @PrimaryGeneratedColumn()
    idtipos_abono: number;

    @Column({type: "text", nullable: false})
    tipo: string;

    @Column({type: "int", nullable: false})
    precio: number;

    @OneToMany(() => Socios, (socio) => socio.tipo_abono)
    socios: Socios[]

}