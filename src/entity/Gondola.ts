import { Produto } from "./Produto";
import { Produtor } from "./Produtor";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Gondola {

    @PrimaryGeneratedColumn("uuid")
    idGondola:string;

    @ManyToMany(type => Produto)
    @JoinTable()
    produtos: Array<Produto>;

    @OneToOne(type => Produtor)
    @JoinColumn()
    produtor:Produtor;

    @Column()
    isExpostaPerfil: boolean;
    
}