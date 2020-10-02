import { Produtor } from "./Produtor";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { ItemGondola } from "./ItemGondola";

@Entity()
export class Gondola {

    @PrimaryGeneratedColumn("uuid")
    idGondola: string;

    @Column()
    isExpostaPerfil: boolean;

    @ManyToOne(type => Produtor)
    @JoinColumn()
    produtor: Produtor;

    @OneToMany(type => ItemGondola, itemGondola => itemGondola.gondola, {
        cascade: true,       
        eager: true
    })
    itensGondola: ItemGondola[] 
}