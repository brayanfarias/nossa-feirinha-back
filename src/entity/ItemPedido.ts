import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./Pedido";
import { Produto } from "./Produto";

@Entity()
export class ItemPedido {

    @PrimaryGeneratedColumn('uuid')
    idItemPedido: string;

    @ManyToOne(type => Produto, {
        eager: true,
    })
    @JoinColumn()
    produto: Produto;

    @Column()
    quantidade: number;

    @ManyToOne(type => Pedido, pedido => pedido.itensPedido,{
        onDelete: "CASCADE",
    })
    pedido:Pedido;

}