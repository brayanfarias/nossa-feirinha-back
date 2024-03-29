import { EntityRepository, Repository } from "typeorm";
import { Consumidor } from "../entity/Consumidor";
import { Favorito } from "../entity/Favorito";
import Produto from "../entity/Produto";
import ProdutoService from "../services/ProdutoService";
import moment = require('moment');

const produtoService = new ProdutoService()

@EntityRepository(Favorito)
class FavoritoRespository extends Repository<Favorito>{

    async changeIsAtivo(favorito: Favorito): Promise<Favorito> {

        if (favorito.isAtivo) {
            favorito.dataInativo = moment().format();
            favorito.isAtivo = false;
        } else {
            favorito.dataInativo = null;
            favorito.isAtivo = true;
        }

        return await this.save(favorito)

    }

    async montarObjetoSalvar(consumidor: Consumidor, produtos: any[]): Promise<Favorito> {

        const favorito = new Favorito();

        favorito.consumidor = consumidor;

        favorito.produtos = []

        for (const item of produtos) {

            const idProduto = item.Produto.idProduto
            const produto: Produto = await produtoService.getById(idProduto)

            favorito.produtos.push(produto)

        }

        return await this.save(favorito)

    }


}

export default FavoritoRespository;