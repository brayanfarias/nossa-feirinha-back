import { Request, Response } from "express";
import { Assinatura } from "../entity/Assinatura";
import { Evento } from "../entity/Evento";
import { Usuario } from "../entity/Usuario";
import AssinaturaService from "../services/AssinaturaService";
import EventoService from "../services/EventoService";
import UsuarioService from "../services/UsuarioService";

const assinaturaService = new AssinaturaService();
const eventoService = new EventoService()
const usuarioService = new UsuarioService()

export class AssinaturaController {

    async desassinarEvento(request: Request, response: Response) {

        const idAssinatura = request.params.idAssinatura;

        let assinatura: Assinatura = await assinaturaService.getById(idAssinatura);

        assinatura = await assinaturaService.settingDesassinar(assinatura)

        return response.status(200).send(assinatura)

    }

    async createAssinatura(request: Request, response: Response) {

        const idEvento = request.body.Evento.idEvento

        const evento: Evento = await eventoService.getById(idEvento)

        const idUsuario = request.body.Usuario.idUsuario

        const usuario: Usuario = await usuarioService.getById(idUsuario)

        const assinatura: Assinatura = await assinaturaService.createAssinatura(evento, usuario)

        return response.status(200).send(assinatura)
    }

}

export default AssinaturaController;