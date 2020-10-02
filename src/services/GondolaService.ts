import { getConnection } from "typeorm"
import { Gondola } from "../entity/Gondola"
import { ItemGondola } from "../entity/ItemGondola";
import { Produto } from "../entity/Produto";
import { Produtor } from "../entity/Produtor";
import ItemGondolaService from "../services/ItemGondolaService";
import ProdutorService from "../services/ProdutorService";
import { ProdutoService } from "./ProdutoService";

const itemGondolaService = new ItemGondolaService();
const produtorService = new ProdutorService();
const produtoService = new ProdutoService();



export class GondolaService {

    async getById(idGondola: string): Promise<Gondola> {

        return await getConnection().getRepository(Gondola).findOne(idGondola)

    }

    async delete(gondola: Gondola): Promise<Gondola> {

        return await getConnection().getRepository(Gondola).remove(gondola)

    }

    async deleteItemGondolaRelation(gondola: Gondola) {

        for (const itemGondola of gondola.itensGondola) {
            await itemGondolaService.delete(itemGondola)
        }
    }

    async getAllGondolas(): Promise<Gondola[]> {

        return await getConnection().getRepository(Gondola).find();

    }

    async createGondola(idUsuario: string, itensGondola: ItemGondola[]): Promise<Gondola> {

        const produtor: Produtor = await produtorService.getById(idUsuario)

        const gondola = new Gondola();

        gondola.itensGondola = [];

        gondola.produtor = produtor;

        for (const index of itensGondola) {
            const idProduto = index.produto.idProduto;
            const produto: Produto = await produtoService.getById(idProduto);

            const itemGondola = new ItemGondola();
            itemGondola.produto = produto;
            itemGondola.quantidade = index.quantidade
            gondola.itensGondola.push(itemGondola);
        }

        return await getConnection().getRepository(Gondola).save(gondola);

    }

}

export default GondolaService;