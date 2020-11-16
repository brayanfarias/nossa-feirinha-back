import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consumidor } from "./Consumidor";
import { Produto } from "./Produto";

@Entity()
export class Favorito {

    @PrimaryGeneratedColumn('uuid')
    idFavorito: string;

    @OneToOne(type => Consumidor)
    @JoinColumn()
    consumidor: Consumidor;

    @Column({
        nullable: true,
    })
    dataInativo: string;

    @Column()
    isAtivo: boolean = true;

    @ManyToMany(() => Produto)
    @JoinTable()
    produtos: Produto[];
}