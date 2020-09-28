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