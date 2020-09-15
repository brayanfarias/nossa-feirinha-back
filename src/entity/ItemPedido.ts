import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "./Produto";

@Entity()
export class ItemPedido {

    @PrimaryGeneratedColumn('uuid')
    idItemPedido: string;

    @OneToOne(type => Produto)
    @JoinTable()
    produto: Produto;

    @Column()
    valor: string;

    @Column()
    quantidade: number;

}