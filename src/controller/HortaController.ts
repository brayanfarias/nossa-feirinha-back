import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Horta } from "../entity/Horta";
import Produto from "../entity/Produto";
import Produtor from "../entity/Produtor";
import HortaRepository from "../repository/HortaRepository";
import ProdutorService from "../services/ProdutorService";

const produtorService= new ProdutorService()

class HortaController {

    async getByProdutor(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const produtor: Produtor = await produtorService.getById(idUsuario);

        const hortas: Horta[] = await getCustomRepository(HortaRepository).find({ where: { produtor: produtor }, relations: ["produtos"]})

        return response.status(200).send(hortas);

    }
    
    async create(request: Request, response: Response) {

        const idUsuario: string = request.body.Produtor.idUsuario

        const produtor:Produtor = await produtorService.getById(idUsuario)
       
        const produtos: Produto[] = request.body.produtos

        const horta = await getCustomRepository(HortaRepository).montarObjetoHortaSalvar(request.body, produtor,produtos)   

        return response.status(200).send(horta);

    }


    
}

export default new HortaController;