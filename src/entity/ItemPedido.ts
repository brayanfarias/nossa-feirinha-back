import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "./Produto";

@Entity()
export class ItemPedido {

    @PrimaryGeneratedColumn('uuid')
    idItemPedido: string;

    @OneToOne(type => Produto)
    @JoinColumn()
    produto: Produto;

    @Column()
    valor: string;

    @Column()
    quantidade: number;

}