import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity("usuarios")
@Unique(['idusuario'])
export class Usuarios {

    @PrimaryGeneratedColumn()
    idusuario: number;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    nombre_completo: string;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    correo: string;

    @Column({type: "text", nullable: false})
    fecha_nacimiento: string;

    @Column({type: "varchar", width: 255, default: null, nullable: true})
    password: string;


    checkPassword(password: string):boolean{
        return bcrypt.compareSync(password, this.password);
    }

}