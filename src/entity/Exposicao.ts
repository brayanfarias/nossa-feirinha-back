import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { Evento } from "./Evento";

@Entity()
export class Exposicao{

    @PrimaryGeneratedColumn("uuid")
    idExposicao:string;

    @OneToOne(type => Gondola)
    @JoinColumn()
    gondola:Gondola;

    @OneToOne(type => Evento)
    @JoinColumn()
    evento:Evento;

}