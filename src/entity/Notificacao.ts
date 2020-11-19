import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "./Evento";
import { Usuario } from "./Usuario";
import moment = require('moment');

@Entity()
export class Notificacao {

    @PrimaryGeneratedColumn('uuid')
    idNotificacao: string;

    @ManyToOne(type => Usuario)
    @JoinColumn()
    usuario: Usuario;

    @Column()
    dataAssinaturaNotificacao: string = moment().format();

    @Column()
    isAtivo: boolean = true;

    @ManyToOne(type => Evento)
    @JoinColumn()
    evento: Evento

    @Column()
    canalEscolhido: string = "MENU_NOTIFICACAO";
}