import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Assinatura } from "../entity/Assinatura";
import { Endereco } from "../entity/Endereco";
import { Evento } from "../entity/Evento";
import { Exposicao } from "../entity/Exposicao";
import { Gondola } from "../entity/Gondola";
import { Usuario } from "../entity/Usuario";
import AssinaturaService from "../services/AssinaturaService";
import EnderecoService from "../services/EnderecoService";
import EventoService from "../services/EventoService";
import ExposicaoService from "../services/ExposicaoService";
import UsuarioService from "../services/UsuarioService";

const eventoService = new EventoService();
const usuarioService = new UsuarioService();
const enderecoService = new EnderecoService()
const assinaturaService = new AssinaturaService()
const exposicaoService = new ExposicaoService()


class EventoController extends Repository<Evento> {

   async updateEvento(request: Request, response: Response) {

    const evento: Evento = request.body as Evento;

    const result = await eventoService.update(evento)

    return response.status(200).send(result)

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