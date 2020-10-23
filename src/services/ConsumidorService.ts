import { EntityRepository, getConnection, Repository } from "typeorm";
import { Consumidor } from "../entity/Consumidor";

@EntityRepository(Consumidor)
export class ConsumidorService extends Repository<Consumidor>{

    async getById(idUsuario: string): Promise<Consumidor> {

        return await getConnection().getRepository(Consumidor).findOne(idUsuario)

    }

}

export default ConsumidorService;