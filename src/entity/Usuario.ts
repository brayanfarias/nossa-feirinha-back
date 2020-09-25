import { PrimaryGeneratedColumn, Column, OneToOne, JoinTable, JoinColumn } from 'typeorm'
import { Endereco } from './Endereco';

export class Usuario {

    @PrimaryGeneratedColumn("uuid")
    idUsuario: string;

    @Column()
    nome: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @OneToOne(type => Endereco,{
        cascade: true,
        /**
         * @todo Implementar outra forma de deletar a linha do Endereco
         * @see https://github.com/typeorm/typeorm/issues/3218
         */
        onDelete: "CASCADE",
        eager: true        
    })
    @JoinColumn()
    endereco: Endereco
    
}