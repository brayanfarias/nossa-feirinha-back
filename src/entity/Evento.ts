import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne, ViewColumn, JoinTable } from "typeorm";
import { Consumidor } from "./Consumidor";
import { Endereco } from "./Endereco";
import { Produtor } from "./Produtor";

@Entity()
export class Evento {

    @PrimaryGeneratedColumn("uuid")
    idEvento: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    dataEvento: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @ManyToOne(type => Consumidor, consumidor => consumidor.eventos, {
        eager: true,
    })
    criadorConsumidor: Consumidor;

    @ManyToOne(type => Produtor, produtor => produtor.eventos, {
        eager: true,
    })
    criadorProdutor: Produtor;

    @OneToOne(type => Endereco, {
        cascade: true,
        /**
         * @todo Implementar outra forma de deletar a linha do Endereco
         * @see https://github.com/typeorm/typeorm/issues/3218
         */
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn()
    endereco: Endereco;
}