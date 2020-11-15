import { getConnection, Like } from "typeorm";
import { Produto } from "../entity/Produto";

export class ProdutoService {

    async getByName(nome): Promise<Produto[]> {

        return await getConnection().getRepository(Produto).find({ where: { nome: Like(`%${nome}%`) } })

    }

    async getById(idProduto: string):Promise<Produto> {

        return await getConnection().getRepository(Produto).findOne(idProduto)

    }


}

export default ProdutoService;

