import { getConnection } from "typeorm";
import { Produto } from "../entity/Produto";


export class ProdutoService {

    async getById(idProduto: string):Promise<Produto> {

        return await getConnection().getRepository(Produto).findOne(idProduto)

    }


}

export default ProdutoService;

