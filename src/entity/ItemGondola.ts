import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gondola } from "./Gondola";
import { Produto } from "./Produto";

@Entity()
export class ItemGondola {

    @PrimaryGeneratedColumn('uuid')
    idItemGondola: string;

    @ManyToOne(type => Produto, {
        eager: true
    })
    @JoinColumn()
    produto: Produto;

    @Column()
    quantidade: number;

    @ManyToOne(type => Gondola, gondola => gondola.itensGondola)
    gondola: Gondola

}