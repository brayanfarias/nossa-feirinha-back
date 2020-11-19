import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Evento } from "../entity/Evento";
import { Notificacao } from "../entity/Notificacao";
import { Usuario } from "../entity/Usuario";
import EventoRepository from "../repository/EventoRepository";
import NotificacaoRepository from "../repository/NotificacaoRepository";
import UsuarioRepository from "../repository/UsuarioRepository";


class NotificacaoController {

    async getAllNotificacoes(request: Request, response: Response) {

        const notificacoes: Notificacao[] = await getCustomRepository(NotificacaoRepository).find({ relations: ["usuario", "evento"] })

        return response.status(200).send(notificacoes)

    }

    async createNotificacao(request: Request, response: Response) {

        const idEvento = request.body.Evento.idEvento

        const evento: Evento = await getCustomRepository(EventoRepository).findOne(idEvento);

        const usuario: Usuario = await getCustomRepository(UsuarioRepository).findOne(evento.criador.idUsuario)

        const notificacao: Notificacao = await getCustomRepository(NotificacaoRepository).montarObjetoESalvar(usuario, evento)

        return response.status(200).send(notificacao)

    }


}

export default new NotificacaoController;