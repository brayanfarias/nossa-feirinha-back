import { getConnection } from "typeorm";
import { Produtor } from "../entity/Produtor";


export class ProdutorService {

    async getById(idUsuario: string): Promise<Produtor> {

        return await getConnection().getRepository(Produtor).findOne(idUsuario)

    }

}

export default ProdutorService;