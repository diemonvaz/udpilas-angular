import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity("usuarios")
@Unique(['idusuario'])
export class Usuarios {

    @PrimaryGeneratedColumn()
    idusuario: number;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    nombre: string;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    apellidos: string;

    @Column({type: "varchar", width: 255, default: null, nullable: false})
    email: string;

    @Column({type: "date", nullable: true})
    fecha_nacimiento: Date;

    @Column({type: "text", width: 255, default: null, nullable: false})
    password: string;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    telefono: string;

    checkPassword(password: string):boolean{
        return bcrypt.compareSync(password, this.password);
    }

}