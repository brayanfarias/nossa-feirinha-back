import { Column, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consumidor } from "./Consumidor";
import { Produtor } from "./Produtor";
import { Usuario } from "./Usuario";

export class Forma {

    @PrimaryGeneratedColumn('uuid')
    idForma: string;

    @Column()
    dataCriacao: string;

    @Column()
    isAtivo: boolean;

    @Column()
    nomeConvenio: string

    @OneToOne(type => Produtor || Consumidor)
    @JoinTable()
    criador: Usuario
}