import { request, Request, Response } from "express";
import { Evento } from "../entity/Evento";
import { Exposicao } from "../entity/Exposicao";
import { Gondola } from "../entity/Gondola";
import EventoService from "../services/EventoService";
import ExposicaoService from "../services/ExposicaoService";
import GondolaService from "../services/GondolaService";

const gondolaService = new GondolaService()
const eventoService = new EventoService()
const exposicaoService = new ExposicaoService()

export class ExposicaoController {

    async deleteExposicao(request: Request, response: Response) {
        const idExposicao = request.params.idExposicao

        const exposicao:Exposicao = await exposicaoService.getById(idExposicao)

        const result = await exposicaoService.deleteExposicao(exposicao)

        return response.status(200).send(result)
    }

    async createExposicao(request: Request, response: Response) {

        const idGondola = request.body.Gondola.idGondola

        const idEvento = request.body.Evento.idEvento

        const gondola: Gondola = await gondolaService.getById(idGondola)

        const evento: Evento = await eventoService.getById(idEvento)

        const exposicao: Exposicao = await exposicaoService.createExposicao(gondola, evento)

        return response.status(200).send(exposicao)

    }


}

export default ExposicaoController