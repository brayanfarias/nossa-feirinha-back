import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Balcao } from "./Balcao";
import { Consumidor } from "./Consumidor";
import { Entrega } from "./Entrega";
import { ItemPedido } from "./ItemPedido";
import { Pagamento } from "./Pagamento";

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn('uuid')
    idPedido: string;

    @ManyToOne(type => Balcao)
    @JoinTable()
    balcao: Balcao;

    @Column()
    dataPedido: string;

    @ManyToOne(type => Pagamento)
    @JoinTable()
    pagamento: Pagamento;

    @ManyToOne(type => Entrega)
    @JoinTable()
    entrega: Entrega;

    @OneToMany(type => ItemPedido, itemPedido => itemPedido.pedido, {
        cascade: true,
        eager: true,
    })
    itensPedido: ItemPedido[];

    @ManyToOne(type => Consumidor)
    @JoinTable()
    consumidor: Consumidor;
}