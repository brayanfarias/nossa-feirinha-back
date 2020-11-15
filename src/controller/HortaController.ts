import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Horta } from "../entity/Horta";
import Produto from "../entity/Produto";
import Produtor from "../entity/Produtor";
import HortaRepository from "../repository/HortaRepository";
import ProdutorService from "../services/ProdutorService";

const produtorService = new ProdutorService()

class HortaController {

    async deleteHorta(request: Request, response: Response) {

        const idHorta = request.params.idHorta

        const horta: Horta = await getCustomRepository(HortaRepository).findOne(idHorta)

        const result = await getCustomRepository(HortaRepository).remove(horta)

        return response.status(200).send(result)
    }

    async updateHorta(request: Request, response: Response) {

        const horta: Horta = request.body

        const result: Horta = await getCustomRepository(HortaRepository).save(horta)

        return response.status(200).send(result)
    }

    async getHorta(request: Request, response: Response) {

        const idHorta = request.params.idHorta

        const horta: Horta = await getCustomRepository(HortaRepository).findOne(idHorta, { relations: ["produtos"] })

        return response.status(200).send(horta);

    }

    async settingIsColhido(request: Request, response: Response) {

        const idHorta = request.params.idHorta
       
        const horta:Horta =  await getCustomRepository(HortaRepository).findOne(idHorta)

        const result:Horta = await getCustomRepository(HortaRepository).changeIsColhido(horta)

        return response.status(200).send(result)
    }

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