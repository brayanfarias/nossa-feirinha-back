
import { Evento } from "../entity/Evento";
import { getConnection } from "typeorm";
import { Request, Response } from "express";
import UsuarioController from "./UsuarioController";

class EventoController {

    async delete(request: Request, response: Response) {

        const idEvento = request.params.idEvento;
     
        const evento = await getConnection().getRepository(Evento).findOne(idEvento)

        const result = await getConnection().getRepository(Evento).remove(evento);

        return response.status(200).send(result)
    }

    async get(request: Request, response: Response) {

        const idEvento = request.params.idEvento;

        const result = await getConnection().getRepository(Evento).findOne(idEvento)

        return response.status(200).send(result);
    }

    async create(request: Request, response: Response) {

        const idUsuario: string = request.body.Criador.idUsuario;

        const resultUsuario = await new UsuarioController().get(idUsuario)       

        const evento: Evento = request.body as Evento;

        evento.criador = resultUsuario;      

        const result = await getConnection().getRepository(Evento).save(evento)

        return response.status(200).send(result);
    };
}

export default EventoController;