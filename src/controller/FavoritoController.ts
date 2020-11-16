import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Consumidor } from "../entity/Consumidor";
import { Favorito } from "../entity/Favorito";
import Produto from "../entity/Produto";
import FavoritoRespository from "../repository/FavoritoRepository";
import UsuarioRepository from "../repository/UsuarioRepository";


class FavoritoController {

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