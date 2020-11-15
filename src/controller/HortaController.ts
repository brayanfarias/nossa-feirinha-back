import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Horta } from "../entity/Horta";
import Produto from "../entity/Produto";
import Produtor from "../entity/Produtor";
import HortaRepository from "../repository/HortaRepository";
import ProdutorService from "../services/ProdutorService";

const produrtoService= new ProdutorService()

class HortaController {
    
    async create(request: Request, response: Response) {

        const hortaRepository = getCustomRepository(HortaRepository)

        const idUsuario: string = request.body.Produtor.idUsuario

        const produtor:Produtor = await produrtoService.getById(idUsuario)
       
        const produtos: Produto[] = request.body.produtos

        const horta = await hortaRepository.montarObjetoHortaSalvar(request.body, produtor,produtos)   

        return response.status(200).send(horta);

    }


    
}

export default new HortaController;