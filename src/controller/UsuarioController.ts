import { getConnection } from "typeorm";
import { Usuario } from "../entity/Usuario";


export class UsuarioController {

    async get(idUsuario:string){

        const result = await getConnection().getRepository(Usuario).findOne(idUsuario)

        return result;
       
    }


}

export default UsuarioController;