import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { Evento } from "./Evento";

@Entity()
export class Assinatura {

    @PrimaryGeneratedColumn("uuid")
    idAssinatura:string;

    @OneToOne(type => Evento)
    @JoinColumn()
    evento:Evento;

    @OneToOne(type => Usuario)
    @JoinColumn()
    usuario:Usuario;

    @Column()
    dataAssinatura: string;

    @Column()
    dataDesassinatura:string;

    @Column()
    isAtiva: boolean = true;

}