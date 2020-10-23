import { Usuario } from './Usuario'
import { ChildEntity, Column } from 'typeorm'

@ChildEntity()
export class Admin extends Usuario {

    
}

export default Admin;