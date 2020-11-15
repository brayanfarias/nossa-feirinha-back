import { EntityRepository, Repository } from "typeorm";
import { Balcao } from "../entity/Balcao";
import Produtor from "../entity/Produtor";

@EntityRepository(Balcao)
class BalcaoRepository extends Repository<Balcao>{

    async createBalcao(produtor: Produtor): Promise<Balcao> {

        const balcao = new Balcao()

        balcao.isAtivo = true;

        balcao.produtor = produtor

        return await this.save(balcao)
    }



}

export default BalcaoRepository;