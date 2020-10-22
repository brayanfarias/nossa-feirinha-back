import { Usuario } from './Usuario'
import { ChildEntity, Column } from 'typeorm'

@ChildEntity()
export class Produtor extends Usuario {

    @Column()
    cnpj: string;
    
}

export default Produtor;