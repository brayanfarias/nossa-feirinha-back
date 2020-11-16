import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Balcao } from "../entity/Balcao";
import { Consumidor } from "../entity/Consumidor";
import { Entrega } from "../entity/Entrega";
import { ItemPedido } from "../entity/ItemPedido";
import { Pagamento } from "../entity/Pagamento";
import { Pedido } from "../entity/Pedido";
import BalcaoRepository from "../repository/BalcaoRepository";
import FormaRepository from "../repository/FormaRepository";
import PedidoRepository from "../repository/PedidoRepository";
import UsuarioRepository from "../repository/UsuarioRepository";
import ConsumidorService from "../services/ConsumidorService";

const consumidorService = new ConsumidorService()

class PedidoController {

    async getByIdUsuario(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const usuario = await getCustomRepository(UsuarioRepository).findOne(idUsuario)

        if (!usuario) return response.sendStatus(404);

        const pedidoRepository = getCustomRepository(PedidoRepository)

        if (usuario instanceof Consumidor) {

            const pedidos: Pedido[] = await pedidoRepository.find({ where: { consumidor: usuario }, relations: ["balcao", "pagamento", "entrega"] })

            return response.status(200).send(pedidos)

        } else {

            const balcao: Balcao = await getCustomRepository(BalcaoRepository).findOne({ where: { produtor: usuario } })

            const pedidos: Pedido[] = await pedidoRepository.find({ where: { balcao: balcao }, relations: ["balcao", "pagamento", "entrega", "consumidor"] })

            return response.status(200).send(pedidos)
        }
    }

    async getByIdPedido(request: Request, response: Response) {

        const idPedido = request.params.idPedido

        const pedido: Pedido = await getCustomRepository(PedidoRepository).findOne(idPedido, { relations: ["balcao", "pagamento", "entrega", "consumidor"] })

        return response.status(200).send(pedido);
    }

    async createPedido(request: Request, response: Response) {

        const idBalcao = request.body.Balcao.idBalcao

        const balcao: Balcao = await getCustomRepository(BalcaoRepository).findOne(idBalcao);

        const idFormaPagamento = request.body.Pagamento.idForma

        const formaRepository = getCustomRepository(FormaRepository);

        const pagamento: Pagamento = await formaRepository.findOne(idFormaPagamento);

        const idFormaEntrega = request.body.Pagamento.idForma

        const entrega: Entrega = await formaRepository.findOne(idFormaEntrega)

        const idUsuario = request.body.Consumidor.idUsuario

        const consumidor: Consumidor = await consumidorService.getById(idUsuario)

        const itensPedido: ItemPedido[] = request.body.itensPedido

        const pedido: Pedido = await getCustomRepository(PedidoRepository).montarObjetoPedidoSalvar(balcao, pagamento, entrega, consumidor, itensPedido)

        return response.status(200).send(pedido)
    }



}

export default new PedidoController;