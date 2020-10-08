
import { Evento } from "../entity/Evento";
import { Request, Response } from "express";
import EventoService from "../services/EventoService";
import UsuarioService from "../services/UsuarioService";
import { Usuario } from "../entity/Usuario";
import { Endereco } from "../entity/Endereco";
import EnderecoService from "../services/EnderecoService";

const eventoService = new EventoService();
const usuarioService = new UsuarioService();
const enderecoService = new EnderecoService()

class EventoController {

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