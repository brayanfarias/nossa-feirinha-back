import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, Entity, TableInheritance, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm'
import { Endereco } from './Endereco';
import { Evento } from './Evento';
import { Produto } from './Produto';
import Role from './Role';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Usuario {

    @PrimaryGeneratedColumn("uuid")
    idUsuario: string;

    @Column()
    name: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(type => Endereco, {
        cascade: true,
        /**
         * @todo Implementar outra forma de deletar a linha do Endereco
         * @see https://github.com/typeorm/typeorm/issues/3218
         * Adding the cascade to both sides (OneToMany and ManyToOne) works. If you put it on one side it will not work
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
     
    @CreateDateColumn()
     created_at: Date;
   
    @ManyToMany(() => Role)
    @JoinTable({
       name: "users_roles",
       joinColumns: [{ name: "idUsuario" }],
       inverseJoinColumns: [{ name: "role_id" }],
    })
    roles: Role[]; 

}