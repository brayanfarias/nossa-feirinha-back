import { getConnection } from "typeorm";
import { Evento } from "../entity/Evento";
import { Exposicao } from "../entity/Exposicao";
import { Gondola } from "../entity/Gondola";
import GondolaService from "./GondolaService";

const gondolaService = new GondolaService();

export class ExposicaoService {

    RELATION = {
        GONDOLA: 'gondola',
        EVENTO: 'evento'
    }

    async getByIdGondola(idGondola: string): Promise<Exposicao[]> {
        return await getConnection().getRepository(Exposicao).find({ where: { gondola: idGondola } })
    }
    

    async getByIdEvento(idEvento: string): Promise<Exposicao[]> {
        return await getConnection().getRepository(Exposicao).find({where: {evento: idEvento}})
    }
    
    async extrairRetornarRelation(exposicoes: Exposicao[], relation: string): Promise<any[]> {

        const result = []

        for (const exposicao of exposicoes) {
            if (relation == this.RELATION.GONDOLA) {
                result.push(exposicao.gondola)
            } else if (relation == this.RELATION.EVENTO) {
                result.push(exposicao.evento)
            }

        }

        return result;

    }

    async getById(idExposicao: string): Promise<Exposicao> {
        
        return await getConnection().getRepository(Exposicao).findOne(idExposicao)

    }
    
    async getAllExposicoes(): Promise<Exposicao[]> {

        return await getConnection().getRepository(Exposicao).find()
    }

    async createExposicao(gondola: Gondola, evento: Evento): Promise<Exposicao> {

        const exposicao = new Exposicao();
        exposicao.gondola = gondola;
        exposicao.evento = evento

        return await getConnection().getRepository(Exposicao).save(exposicao);

    }
}

export default ExposicaoService