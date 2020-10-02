import { getConnection } from "typeorm";
import { Produto } from "../entity/Produto";


export class ProdutoService {

    async getById(idProduto: string) {
        return await getConnection().getRepository(Produto).findOne(idProduto)
    }


}

