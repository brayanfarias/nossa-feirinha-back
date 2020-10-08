import { getConnection } from "typeorm"
import { Gondola } from "../entity/Gondola"
import { ItemGondola } from "../entity/ItemGondola";
import { Produto } from "../entity/Produto";
import { Produtor } from "../entity/Produtor";
import ItemGondolaService from "./ItemGondolaService";
import ProdutorService from "./ProdutorService";
import { ProdutoService } from "./ProdutoService";

const itemGondolaService = new ItemGondolaService();
const produtorService = new ProdutorService();
const produtoService = new ProdutoService();



export class GondolaService {

    async getByProdutor(produtor: Produtor): Promise<Gondola[]> {

        return await getConnection().getRepository(Gondola).find({where: {produtor: produtor}})
    }

    async getById(idGondola: string): Promise<Gondola> {

        return await getConnection().getRepository(Gondola).findOne(idGondola, {relations : ['produtor']})

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

    async createGondola(nome: string, idUsuario: string, itensGondola: ItemGondola[]): Promise<Gondola> {

        const produtor: Produtor = await produtorService.getById(idUsuario)

        const gondola = new Gondola();

        gondola.itensGondola = [];

        gondola.produtor = produtor;

        gondola.nome = nome

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