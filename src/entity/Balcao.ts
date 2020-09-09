import { Produtor } from "./Produtor";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Balcao {

    @PrimaryGeneratedColumn("uuid")
    idBalcao: string;

    @Column()
    isAtivo: boolean;
   
    @OneToOne(type => Produtor)
    @JoinColumn()
    produtor: Produtor;
}