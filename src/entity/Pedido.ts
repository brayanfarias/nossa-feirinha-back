import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Balcao } from "./Balcao";
import { Consumidor } from "./Consumidor";
import { Entrega } from "./Entrega";
import { ItemPedido } from "./ItemPedido";
import { Pagamento } from "./Pagamento";

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn('uuid')
    idPedido: string;

    @OneToOne(type => Balcao)
    @JoinTable()
    balcao: Balcao;

    @Column()
    dataPedido: string;

    @OneToOne(type => Pagamento)
    @JoinTable()
    pagamento: Pagamento;

    @OneToOne(type => Entrega)
    @JoinTable()
    entrega: Entrega;

    @ManyToMany(type => ItemPedido)
    @JoinTable()
    itensPedido: Array<ItemPedido>;

    @OneToOne(type => Consumidor)
    @JoinTable()
    consumidor: Consumidor;
}