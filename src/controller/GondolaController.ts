import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Gondola } from "../entity/Gondola";
import { ItemGondola } from "../entity/ItemGondola";
import { Produto } from "../entity/Produto";
import { Produtor } from "../entity/Produtor";
import ProdutoController from "./ProdutoController";
import ProdutorController from "./ProdutorController";

export class GondolaController {

    async create(request: Request, response: Response) {

        const idUsuario = request.body.Produtor.idUsuario

        const produtor: Produtor = await new ProdutorController().getById(idUsuario);

        const gondola = new Gondola();
        gondola.itensGondola = [];

        const isExpostaPerfil = request.body.isExpostaPerfil
        gondola.isExpostaPerfil = isExpostaPerfil

        gondola.produtor = produtor;

        const idProduto = request.body.itensGondola[0].idProduto

        const produto: Produto = await new ProdutoController().getById(idProduto)

        const itemGondola = new ItemGondola();
        itemGondola.produto = produto;
        itemGondola.quantidade = request.body.itensGondola[0].quantidade
        gondola.itensGondola.push(itemGondola);

        const result = await getConnection().getRepository(Gondola).save(gondola)

        response.status(200).send(result)
    }



}

export default GondolaController;