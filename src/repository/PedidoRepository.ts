import { EntityRepository, Repository } from "typeorm";
import { Balcao } from "../entity/Balcao";
import { Consumidor } from "../entity/Consumidor";
import { Entrega } from "../entity/Entrega";
import { ItemPedido } from "../entity/ItemPedido";
import { Pagamento } from "../entity/Pagamento";
import { Pedido } from "../entity/Pedido";
import Produto from "../entity/Produto";
import ProdutoService from "../services/ProdutoService";
import moment = require('moment');

const produtoService = new ProdutoService()

@EntityRepository(Pedido)
class PedidoRepository extends Repository<Pedido>{

    async montarObjetoPedidoSalvar(balcao: Balcao, pagamento: Pagamento, entrega: Entrega, consumidor: Consumidor, itensPedido: any[]): Promise<Pedido> {

        const pedido = new Pedido();

        pedido.balcao = balcao;

        pedido.dataPedido = moment().format();

        pedido.pagamento = pagamento;

        pedido.entrega = entrega;

        pedido.consumidor = consumidor;

        pedido.itensPedido = []

        for (const item of itensPedido) {
            
            const idProduto = item.idProduto;
            const produto: Produto = await produtoService.getById(idProduto)
   
            let itemPedido = new ItemPedido()
            itemPedido.produto = produto;
            itemPedido.quantidade = item.Produto.quantidade;
            pedido.itensPedido.push(itemPedido)

        }

        return await this.save(pedido)

    }


}

export default PedidoRepository;