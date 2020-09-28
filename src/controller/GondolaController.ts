import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { Gondola } from "../entity/Gondola";
import { ItemGondola } from "../entity/ItemGondola";
import { Produto } from "../entity/Produto";
import { Produtor } from "../entity/Produtor";
import ProdutoController from "./ProdutoController";
import ProdutorController from "./ProdutorController";

export class GondolaController {
    
    async getAll() {
        throw new Error('Method not implemented.');
    }

    async create(request: Request, response: Response) {

        const idUsuario = request.body.Produtor.idUsuario

        const produtor: Produtor = await new ProdutorController().getById(idUsuario);

        const gondola = new Gondola();
        gondola.itensGondola = [];

        gondola.isExpostaPerfil = request.body.isExpostaPerfil

        gondola.produtor = produtor;

        const produtoController = new ProdutoController()

        for (const index of request.body.itensGondola) {
            const idProduto = index.idProduto;
            const produto: Produto = await produtoController.getById(idProduto);

            const itemGondola = new ItemGondola();
            itemGondola.produto = produto;
            itemGondola.quantidade = index.quantidade
            gondola.itensGondola.push(itemGondola);
        }

        const result = await getConnection().getRepository(Gondola).save(gondola)

        response.status(200).send(result)
    }
}

export default GondolaController;