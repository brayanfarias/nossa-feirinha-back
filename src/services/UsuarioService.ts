import { getConnection } from "typeorm";
import { Usuario } from "../entity/Usuario";

export class UsuarioService {

    async getById(idUsuario: string): Promise<Usuario> {

        return await getConnection().getRepository(Usuario).findOne(idUsuario)

    }

}

export default UsuarioService;