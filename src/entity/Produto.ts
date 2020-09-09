import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn("uuid")
    idProdutor:string;

    @Column()
    nome:string;

    @Column()
    sistemaUnidade:string;

    @Column()
    imagem: string;

}