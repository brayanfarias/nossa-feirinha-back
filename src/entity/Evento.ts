import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne, ViewColumn, JoinTable } from "typeorm";
import { Consumidor } from "./Consumidor";
import { Produtor } from "./Produtor";

@Entity()
export class Evento {

    @PrimaryGeneratedColumn("uuid")
    idEvento: string;

    @Column()
    nome: string;

    @Column()
    dataEvento: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string
    
    @ManyToOne(type => Consumidor, consumidor => consumidor.eventos,{
        eager: true,
    })  
    criadorConsumidor: Consumidor;

    @ManyToOne(type => Produtor, produtor => produtor.eventos, {
        eager: true,
    })
    criadorProdutor: Produtor;
}