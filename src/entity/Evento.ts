import { Usuario } from "./Usuario";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
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

    @OneToOne(type => Produtor || Consumidor)
    @JoinColumn()
    criador: Usuario
}