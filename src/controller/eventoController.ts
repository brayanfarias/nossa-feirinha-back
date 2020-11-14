import { Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { Assinatura } from "../entity/Assinatura";
import { Endereco } from "../entity/Endereco";
import { Evento } from "../entity/Evento";
import { Exposicao } from "../entity/Exposicao";
import { Gondola } from "../entity/Gondola";
import { ItemGondola } from "../entity/ItemGondola";
import { Produto } from "../entity/Produto";
import { Usuario } from "../entity/Usuario";
import AssinaturaService from "../services/AssinaturaService";
import EnderecoService from "../services/EnderecoService";
import EventoService from "../services/EventoService";
import ExposicaoService from "../services/ExposicaoService";
import ProdutoService from "../services/ProdutoService";
import UsuarioService from "../services/UsuarioService";
import moment = require("moment");


const eventoService = new EventoService();
const usuarioService = new UsuarioService();
const enderecoService = new EnderecoService()
const assinaturaService = new AssinaturaService()
const exposicaoService = new ExposicaoService()
const produtoService = new ProdutoService()


class EventoController extends Repository<Evento> {

    async updateEvento(request: Request, response: Response) {

        const evento: Evento = request.body as Evento;
       
        const endereco:Endereco = request.body.endereco as Endereco

        await enderecoService.update(endereco)

        await eventoService.update(evento)

        const result = await eventoService.getById(evento.idEvento)

        return response.status(200).send(result)

    }

    async getEventosByProduto(request: Request, response: Response) {

        const produto = request.query.product

        const produtos: Produto[] = await produtoService.getByName(produto)

        const itensGondola: ItemGondola[] = []

        for (const produto of produtos) {

            const result: ItemGondola[] = await getConnection().getRepository(ItemGondola).find({ where: { produto: produto } })

            for (const itemGondola of result) {

                itensGondola.push(itemGondola)

            }
        }

        const exposicoes: Exposicao[] = []

        for (const itemGondola of itensGondola) {

           const result:Exposicao[] =  await getConnection().getRepository(Exposicao).find({where: {gondola : itemGondola.gondola}})

           for (const exposicao of result) {

               exposicoes.push(exposicao)
               
           }
            
        }


        const horaAtual = moment().format();

        const eventos = exposicoes.filter( exposicao => {
            const horaEvento = moment(exposicao.evento.dataEvento).format();

            if (horaEvento > horaAtual) {
                return exposicao.evento;
            }
        })


        return response.status(200).send(eventos)

    }

    async getAllGondolas(request: Request, response: Response) {

        const idEvento = request.params.idEvento

        const exposicoes: Exposicao[] = await exposicaoService.getByIdEvento(idEvento)

        const gondolas:Gondola[] = await exposicaoService.extrairRetornarRelation(exposicoes, exposicaoService.RELATION.GONDOLA)

        return response.status(200).send(gondolas)

    }
    


    async getSubscribersAtivos(request: Request, response: Response) {

        const idEvento = request.params.idEvento

        const evento: Evento = await eventoService.getById(idEvento)

        let assinaturas: Assinatura[] = await assinaturaService.getByEvento(evento)

        assinaturas = await assinaturaService.FilterByIsAtiva(assinaturas, true)

        const usuarios: Usuario[] = await usuarioService.extractUsersFromAssinatura(assinaturas)

        return response.status(200).send(usuarios)

    }

    async getEventosAtivos(request: Request, response: Response) {

        const eventosAtivos: Evento[] = await eventoService.getAllEventosAtivos();

        return response.status(200).send(eventosAtivos)

    }

    async deleteEventoAndItsRelations(request: Request, response: Response) {

        const idEvento = request.params.idEvento

        const evento: Evento = await eventoService.getById(idEvento)

        const result: Evento = await eventoService.delete(evento)

        await eventoService.deleteEnderecoRelation(evento)

        return response.status(200).send(result)
    }


    async getEvento(request: Request, response: Response) {

        const idEvento = request.params.idEvento;

        const result = await eventoService.getById(idEvento)

        return response.status(200).send(result);
    }

    async createEvento(request: Request, response: Response) {

        const idUsuario: string = request.body.Criador.idUsuario;

        const usuario: Usuario = await usuarioService.getById(idUsuario)

        let endereco: Endereco = request.body.endereco as Endereco

        endereco = await enderecoService.create(endereco)

        const evento: Evento = request.body as Evento;

        const result = await eventoService.createEvento(evento, endereco, usuario)

        return response.status(200).send(result);
    };
}

export default new EventoController();