import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { Evento } from "./Evento";
import { Consumidor } from "./Consumidor";
import { Produtor } from "./Produtor";

@Entity()
export class Assinatura {

    @PrimaryGeneratedColumn("uuid")
    idAssinatura:string;

    @OneToOne(type => Evento)
    @JoinColumn()
    evento:Evento;

    @OneToOne(type => Produtor || Consumidor)
    @JoinColumn()
    usuario:Usuario;

    @Column()
    dataAssinatura: string;

    @Column()
    dataDesassinatura:string;

    @Column()
    isAtiva: boolean;

}