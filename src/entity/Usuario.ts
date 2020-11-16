import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { Endereco } from './Endereco';
import { Evento } from './Evento';
import { Produto } from './Produto';
import Role from './Role';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Usuario {

    @PrimaryGeneratedColumn("uuid")
    idUsuario: string;

    @Column({
        nullable: true,
    })
    foto: string;

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
        eager: true,
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