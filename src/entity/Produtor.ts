import { Usuario } from './Usuario'
import { Column, Entity, OneToMany } from 'typeorm'
import { Evento } from './Evento';

@Entity()
export class Produtor extends Usuario {

    @Column()
    cnpj: string;

    @OneToMany(type => Evento, evento => evento.criadorProdutor)
     eventos: Evento[]
}