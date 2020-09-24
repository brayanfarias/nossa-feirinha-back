import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Endereco {

    @PrimaryGeneratedColumn('uuid')
    idEndereco:string;

    @Column()
    rua: string;

    @Column()
    numero:string;

    @Column()
    complemento:string;

    @Column()
    bairro:string

    @Column()
    cidade:string;

    @Column()
    uf:string;

    @Column()
    cep:number;
}