import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Evento } from "./Evento";
import { Gondola } from "./Gondola";

@Entity()
export class Exposicao {

    @PrimaryGeneratedColumn("uuid")
    idExposicao: string;

    @ManyToOne(type => Gondola, {
        eager: true
    })
    @JoinColumn()
    gondola: Gondola;

    @ManyToOne(type => Evento,{
        eager: true
    })
    @JoinColumn()
    evento: Evento;

}