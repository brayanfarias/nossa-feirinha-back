import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Consumidor } from "./Consumidor";
import { Produtor } from "./Produtor";

@Entity()
export class Evento {

    @PrimaryGeneratedColumn("uuid")
    idEvento:string;

    @Column()
    nome:string;

    @Column()
    dataEvento: string;

    @Column()
    latitude:string;

    @Column()
    longitude:string

    @ManyToOne(type => Produtor || Consumidor)
    @JoinColumn()
    criador:  Consumidor | Produtor;
}