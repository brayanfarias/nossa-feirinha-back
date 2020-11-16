import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Consumidor } from "../entity/Consumidor";
import { Favorito } from "../entity/Favorito";
import Produto from "../entity/Produto";
import FavoritoRespository from "../repository/FavoritoRepository";
import UsuarioRepository from "../repository/UsuarioRepository";

class FavoritoController {

    async updateFavorito(request: Request, response: Response) {

        const favorito: Favorito = request.body as Favorito;

        const result: Favorito = await getCustomRepository(FavoritoRespository).save(favorito);

        return response.status(200).send(result)
    }

    async getByIdConsumidor(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const consumidor: Consumidor = await getCustomRepository(UsuarioRepository).findOne(idUsuario) as Consumidor

        const favorito: Favorito = await getCustomRepository(FavoritoRespository).findOne({ where: { consumidor: consumidor }, relations: ["produtos"] })

        return response.status(200).send(favorito)
    }

    async getByIdFavorito(request: Request, response: Response) {

        const idFavorito = request.params.idFavorito

        const favorito: Favorito = await getCustomRepository(FavoritoRespository).findOne(idFavorito, {relations: ["consumidor", "produtos"]})

        return response.status(200).send(favorito)

    }

    async createFavorito(request: Request, response: Response) {

        const isUsuario = request.body.Consumidor.idUsuario

        const consumidor: Consumidor = await getCustomRepository(UsuarioRepository).findOne(isUsuario) as Consumidor

        if (!consumidor) return response.sendStatus(404)

        const produtos: Produto[] = request.body.Produtos

        const favorito: Favorito = await getCustomRepository(FavoritoRespository).montarObjetoSalvar(consumidor, produtos)

        return response.status(200).send(favorito)

    }



}

export default new FavoritoController;