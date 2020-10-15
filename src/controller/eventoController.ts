
import { Evento } from "../entity/Evento";
import { Request, Response } from "express";
import EventoService from "../services/EventoService";
import UsuarioService from "../services/UsuarioService";
import { Usuario } from "../entity/Usuario";
import { Endereco } from "../entity/Endereco";
import EnderecoService from "../services/EnderecoService";
import { Assinatura } from "../entity/Assinatura";
import AssinaturaService from "../services/AssinaturaService";

const eventoService = new EventoService();
const usuarioService = new UsuarioService();
const enderecoService = new EnderecoService()
const assinaturaService = new AssinaturaService()

class EventoController {
    
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

export default EventoController;