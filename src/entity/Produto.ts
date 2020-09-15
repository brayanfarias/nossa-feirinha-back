import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Gondola } from "./Gondola";

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