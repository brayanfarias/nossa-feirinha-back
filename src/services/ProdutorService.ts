import { EntityRepository, getConnection, Repository } from "typeorm";
import { Produtor } from "../entity/Produtor";

@EntityRepository(Produtor)
export class ProdutorService extends Repository<Produtor>{

    async getById(idUsuario: string): Promise<Produtor> {

        return await getConnection().getRepository(Produtor).findOne(idUsuario)

    }

}

export default ProdutorService;