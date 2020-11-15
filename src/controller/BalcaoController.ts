import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Balcao } from "../entity/Balcao";
import Produtor from "../entity/Produtor";
import BalcaoRepository from "../repository/BalcaoRepository";
import ProdutorService from "../services/ProdutorService";

const produtorService = new ProdutorService()

class BalcaoController {

    async createBalcao(request: Request, response: Response) {

        const idUsuario = request.body.Produtor.idUsuario

        const produtor: Produtor = await produtorService.getById(idUsuario);

        const balcao: Balcao = await getCustomRepository(BalcaoRepository).createBalcao(produtor)

        return response.status(200).send(balcao);
    }




}

export default new BalcaoController;