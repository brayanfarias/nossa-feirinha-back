import { PrimaryGeneratedColumn, Column, OneToOne, JoinTable } from 'typeorm'
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

    @OneToOne(type => Endereco)
    @JoinTable()
    endereco:Endereco

}