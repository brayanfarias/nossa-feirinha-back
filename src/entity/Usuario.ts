import { PrimaryGeneratedColumn, Column} from 'typeorm'


export class Usuario {

    @PrimaryGeneratedColumn("uuid")
     idUsuario: string;

    @Column()
    nome:string;

    @Column()
    telefone:string;

    @Column()
    email:string;

    @Column()
    senha:string;

}