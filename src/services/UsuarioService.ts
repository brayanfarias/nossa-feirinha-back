import { getConnection } from "typeorm";
import { Assinatura } from "../entity/Assinatura";
import { Usuario } from "../entity/Usuario";
import AssinaturaService from "./AssinaturaService";

const assinaturaService = new AssinaturaService()

export class UsuarioService {

    async extractUsersFromAssinatura(assinaturas:Assinatura[]): Promise<Usuario[]> {

        const usuarios:Usuario[] = []

        const relation : string = 'usuario'

        for (const assinatura of assinaturas) {
            const result : Assinatura = await assinaturaService.getAssinaturaWithRelation(assinatura.idAssinatura, relation)
            
            usuarios.push(result.usuario)
            
        }
       
        return usuarios;
    }

    async getById(idUsuario: string): Promise<Usuario> {

        return await getConnection().getRepository(Usuario).findOne(idUsuario)

    }

}

export default UsuarioService;