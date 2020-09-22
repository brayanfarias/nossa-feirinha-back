
import { Evento } from "../entity/Evento";
import { getConnection } from "typeorm";
import { Request, Response } from "express";
import { Produtor } from "../entity/Produtor";

class eventoController {

    async create(request: Request, response: Response) {

        const evento: Evento = request.body as Evento;

        const produtor = new Produtor();
        produtor.nome = "teste"

        evento.criador = produtor;

        await getConnection().manager.save(Evento, evento);

        return response.send(evento).status(200);
    }



}


export default eventoController;