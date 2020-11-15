import { EntityRepository, Repository } from "typeorm";
import { Horta } from "../entity/Horta";
import Produto from "../entity/Produto";
import Produtor from "../entity/Produtor";
import ProdutoService from "../services/ProdutoService";

const produtoService = new ProdutoService()

@EntityRepository(Horta)
class HortaRepository extends Repository<Horta> {

    async montarObjetoHortaSalvar(body: any, produtor: Produtor, produtos: any) {

        const horta = new Horta();

        horta.dataPlantio = body.dataPlantio;

        horta.dataPrevisaoColheita = body.dataPrevisaoColheita;

        horta.imagem = body.imagem;

        horta.produtor = produtor;

        horta.produtos = []

        for (const index of produtos) {
            const produto: Produto = await produtoService.getById(index.produto.idProduto)
            horta.produtos.push(produto)
        }
        return await this.save(horta);
    }
}

export default HortaRepository;
