import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consumidor } from "./Consumidor";
import { Produtor } from "./Produtor";
import { Usuario } from "./Usuario";

@Entity()
export class Notificacao {

    @PrimaryGeneratedColumn('uuid')
    idNotificacao:string;

    @OneToOne(type => Consumidor || Produtor)
    @JoinTable()
    usuario:Usuario;

    @Column()
    dataAssinaturaNotificacao:string;

    @Column()
    isAtivo: boolean;

    @Column()
    canalEscolhido:string;

    @Column()
    mensagem:string;
}