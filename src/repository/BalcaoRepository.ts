import { EntityRepository, Repository } from "typeorm";
import { Balcao } from "../entity/Balcao";
import Produtor from "../entity/Produtor";

@EntityRepository(Balcao)
class BalcaoRepository extends Repository<Balcao>{

    async changeIsAtivo(balcao: Balcao): Promise<Balcao> {

        if (balcao.isAtivo) {
            balcao.isAtivo = false;
        } else {
            balcao.isAtivo = true;
        }

        return await this.save(balcao)

    }

    async createBalcao(produtor: Produtor): Promise<Balcao> {

        const balcao = new Balcao()

        balcao.isAtivo = true;

        balcao.produtor = produtor

        return await this.save(balcao)
    }



}

export default BalcaoRepository;