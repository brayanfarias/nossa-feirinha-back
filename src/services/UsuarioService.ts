import { EntityRepository, getConnection, Repository } from "typeorm";
import { Assinatura } from "../entity/Assinatura";
import { Usuario } from "../entity/Usuario";
import AssinaturaService from "./AssinaturaService";

const assinaturaService = new AssinaturaService()

@EntityRepository(Usuario)
export class UsuarioService extends Repository<Usuario> {

    async extractUsersFromAssinatura(assinaturas:Assinatura[]): Promise<Usuario[]> {

        const usuarios:Usuario[] = []

        const relation : string = 'usuario'

        for (const assinatura of assinaturas) {
            const assinaturaRetornada : Assinatura = await assinaturaService.getAssinaturaWithRelation(assinatura.idAssinatura, relation)
            
            usuarios.push(assinaturaRetornada.usuario)
            
        }
       
        return usuarios;
    }

    async getById(idUsuario: string): Promise<Usuario> {

        return await getConnection().getRepository(Usuario).findOne(idUsuario)

    }

}

export default UsuarioService;