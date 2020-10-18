import { getConnection } from "typeorm";
import { Evento } from "../entity/Evento";
import { Exposicao } from "../entity/Exposicao";
import { Gondola } from "../entity/Gondola";

export class ExposicaoService {

    async createExposicao(gondola: Gondola, evento: Evento): Promise<Exposicao> {

        const exposicao = new Exposicao();
        exposicao.gondola = gondola;
        exposicao.evento = evento

        return await getConnection().getRepository(Exposicao).save(exposicao);

    }
}

export default ExposicaoService