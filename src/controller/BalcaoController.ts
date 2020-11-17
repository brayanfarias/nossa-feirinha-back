import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Balcao } from "../entity/Balcao";
import Produtor from "../entity/Produtor";
import BalcaoRepository from "../repository/BalcaoRepository";
import ProdutorService from "../services/ProdutorService";

const produtorService = new ProdutorService()

class BalcaoController {

    async getByIdBalcao(request: Request, response: Response) {

        const idBalcao = request.params.idBalcao

        const balcao: Balcao = await getCustomRepository(BalcaoRepository).findOne(idBalcao)

        return response.status(200).send(balcao)
    }
    
    async getByProdutor(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const produtor: Produtor = await produtorService.getById(idUsuario)

        const balcao: Balcao = await getCustomRepository(BalcaoRepository).findOne({ where: { produtor: produtor } })

        return response.status(200).send(balcao);
    }

    async settingIsAtivo(request: Request, response: Response) {

        const balcaoRepository = getCustomRepository(BalcaoRepository)

        const idBalcao = request.params.idBalcao

        const balcao: Balcao = await balcaoRepository.findOne(idBalcao);

        const result: Balcao = await balcaoRepository.changeIsAtivo(balcao)

        return response.status(200).send(result);

    }

    async createBalcao(request: Request, response: Response) {

        const idUsuario = request.body.Produtor.idUsuario

        const produtor: Produtor = await produtorService.getById(idUsuario);

        const balcao: Balcao = await getCustomRepository(BalcaoRepository).createBalcao(produtor)

        return response.status(200).send(balcao);
    }
}

export default new BalcaoController;