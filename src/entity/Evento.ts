import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Endereco } from "./Endereco";
import { Usuario } from "./Usuario";

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
   
    @ManyToOne(type => Usuario, usuario => usuario.eventos, {
        eager: true,
    })
    criador: Usuario;

    @OneToOne(type => Endereco, {
        eager: true
    })
    @JoinColumn()
    endereco: Endereco;
}