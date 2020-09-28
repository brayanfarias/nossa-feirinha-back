import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, Entity, TableInheritance } from 'typeorm'
import { Endereco } from './Endereco';
import { Evento } from './Evento';
import { Produto } from './Produto';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
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
    endereco: Endereco

    @OneToMany(type => Produto, produto => produto.criador)
    produtos: Produto[];

    @OneToMany(type => Evento, evento => evento.criador)
     eventos: Evento[]

}