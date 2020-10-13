import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { Evento } from "./Evento";

@Entity()
export class Assinatura {

    @PrimaryGeneratedColumn("uuid")
    idAssinatura: string;

    @ManyToOne(type => Evento)
    @JoinColumn()
    evento: Evento;

    @ManyToOne(type => Usuario)
    @JoinColumn()
    usuario: Usuario;

    @Column()
    dataAssinatura: string;

    @Column({ nullable: true })
    dataDesassinatura: string;

    @Column()
    isAtiva: boolean = true;

}