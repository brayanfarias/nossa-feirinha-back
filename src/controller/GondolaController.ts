import { Request, Response } from "express";
import { Evento } from "../entity/Evento";
import { Exposicao } from "../entity/Exposicao";
import { Gondola } from "../entity/Gondola";
import { ItemGondola } from "../entity/ItemGondola";
import ExposicaoService from "../services/ExposicaoService";
import GondolaService from "../services/GondolaService";
import ItemGondolaService from "../services/ItemGondolaService";

const itemGondolaService = new ItemGondolaService()
const gondolaService = new GondolaService();
const exposicaoService = new ExposicaoService()

export class GondolaController {

    async getAllEventos(request: Request, response: Response) {

        const idGondola = request.params.idGondola

        const exposicoes: Exposicao[] = await exposicaoService.getByIdGondola(idGondola)

        const eventos:Evento[] = await exposicaoService.extrairRetornarRelation(exposicoes,exposicaoService.RELATION.EVENTO)

        return response.status(200).send(eventos)

    }

    async deleteItemGondolaFromGondola(request: Request, response: Response) {

        const idGondola = request.params.idGondola

        const idItemGondola = request.params.idItemGondola;

        let gondola: Gondola = await gondolaService.getById(idGondola)

        const itemGondola: ItemGondola = await itemGondolaService.getById(idItemGondola)

        await itemGondolaService.deleteItemGondolaFromGondola(gondola, itemGondola)

        gondola = await gondolaService.getById(idGondola);

        return response.status(200).send(gondola)
    }

    async deleteGondolaAndItsRelations(request: Request, response: Response) {

        const idGondola = request.params.idGondola

        const gondola: Gondola = await gondolaService.getById(idGondola)

        await gondolaService.deleteItemGondolaRelation(gondola)

        const result: Gondola = await gondolaService.delete(gondola)

        return response.status(200).send(result)
    }

    async getGondola(request: Request, response: Response) {

        const idGondola = request.params.idGondola

        const gondola = await gondolaService.getById(idGondola)

        return response.status(200).send(gondola)

    }

    async getGondolas(request: Request, response: Response) {

        const gondolas: Gondola[] = await gondolaService.getAllGondolas()

        return response.status(200).send(gondolas)
    }

    async createGondola(request: Request, response: Response) {

        const nome: string = request.body.nome

        const idUsuario: string = request.body.Produtor.idUsuario

        const itensGondola: ItemGondola[] = request.body.itensGondola

        const result: Gondola = await gondolaService.createGondola(nome, idUsuario, itensGondola)

        return response.status(200).send(result)
    }
}

export default GondolaController;