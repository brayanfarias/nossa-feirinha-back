import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consumidor } from "./Consumidor";
import { Produto } from "./Produto";

@Entity()
export class Favorito {

    @PrimaryGeneratedColumn('uuid')
    idFavorito: string;

    @OneToOne(type => Consumidor)
    @JoinTable()
    consumidor: Consumidor;

    @Column()
    dataInativo: string;

    @Column()
    isAtivo: boolean;

    @ManyToMany(type => Produto)
    @JoinTable()
    produtos: Array<Produto>
}