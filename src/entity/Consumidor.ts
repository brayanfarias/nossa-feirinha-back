import { Usuario } from "./Usuario";
import { Entity, Column, OneToMany } from "typeorm";
import { Evento } from "./Evento";

@Entity()
export class Consumidor extends Usuario{

        @Column()
        cpf:string;

        @OneToMany(type => Evento, evento => evento.criadorConsumidor)
        eventos: Evento[]
}