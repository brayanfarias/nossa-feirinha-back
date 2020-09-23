import { Usuario } from './Usuario'
import { Column, Entity } from 'typeorm'

@Entity()
export class Produtor extends Usuario {

    @Column()
    cnpj: string;
}