import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { Evento } from "./Evento";
import { Gondola } from "./Gondola";

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