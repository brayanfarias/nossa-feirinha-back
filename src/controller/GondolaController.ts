import { Request, Response } from "express";
import { Evento } from "../entity/Evento";
import { Exposicao } from "../entity/Exposicao";
import { Gondola } from "../entity/Gondola";
import { ItemGondola } from "../entity/ItemGondola";
import Produtor from "../entity/Produtor";
import ExposicaoService from "../services/ExposicaoService";
import GondolaService from "../services/GondolaService";
import ItemGondolaService from "../services/ItemGondolaService";
import ProdutorService from "../services/ProdutorService";

const itemGondolaService = new ItemGondolaService()
const gondolaService = new GondolaService();
const exposicaoService = new ExposicaoService()
const produtorService = new ProdutorService()

export class GondolaController {

    async getGondolasByProdutor(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const produtor:Produtor = await produtorService.getById(idUsuario)

        const gondolas:Gondola[] =  await gondolaService.getByProdutor(produtor)
        
        return response.status(200).send(gondolas)

    }

    async updateGondola(request: Request, response:Response) {
        
        const gondola: Gondola = request.body as Gondola;

        const result = await gondolaService.update(gondola)

        return response.status(200).send(result)
       
    }

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

export default new GondolaController();