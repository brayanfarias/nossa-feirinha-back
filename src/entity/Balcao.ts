import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produtor } from "./Produtor";

@Entity()
export class Balcao {

    @PrimaryGeneratedColumn("uuid")
    idBalcao: string;

    @Column()
    isAtivo: boolean =  true;
   
    @OneToOne(type => Produtor)
    @JoinColumn()
    produtor: Produtor;
}