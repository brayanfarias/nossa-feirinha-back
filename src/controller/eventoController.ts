
import { Evento } from "../entity/Evento";
import { getConnection } from "typeorm";
import { Request, Response } from "express";
import { Consumidor } from "../entity/Consumidor";
import { Produtor } from "../entity/Produtor";
import ConsumidorController from "./ConsumidorController";
import ProdutorController from "./ProdutorController";

const consumidorController = new ConsumidorController();
const produtorController = new ProdutorController();


class EventoController {

    async delete(request: Request, response: Response) {

        const idEvento = request.params.idEvento;
     
        const evento = await getConnection().getRepository(Evento).findOne(idEvento)

        const result = await getConnection().getRepository(Evento).remove(evento);

        return response.status(200).send(result)
    }

    async get(request: Request, response: Response) {

        const idEvento = request.params.idEvento;

        const result = await getConnection().getRepository(Evento).findOne(idEvento, { relations: ["criadorConsumidor", "criadorProdutor"] })

        return response.status(200).send(result);
    }

    async create(request: Request, response: Response) {

        const idUsuario: string = request.body.Criador.idUsuario;

        let criadorConsumidor: Consumidor;
        let criadorProdutor: Produtor;

        const evento: Evento = request.body as Evento;

        console.info("[INFO] Procurando pelo criador na tabela consumidor...");
        criadorConsumidor = await consumidorController.getById(idUsuario);

        if (criadorConsumidor) {
            console.info("[INFO] Criador encontrado na tabela consumidor...");
            evento.criadorConsumidor = criadorConsumidor;
            evento.criadorProdutor = null;
        } else {
            console.info("[INFO] Consumidor não encontrado! Procurando pelo criador na tabela produtor...");
            criadorProdutor = await produtorController.getById(idUsuario);
            evento.criadorProdutor = criadorProdutor;
            evento.criadorConsumidor = null;
        }

        if (!criadorConsumidor && !criadorProdutor) {
            console.info("[INFO] Criador não encontrado nem na tabela Produtor nem na tabela Consumidor.");
            return response.status(404).send("Não localizei o criador nem como Consumidor nem como Produtor.");
        }

        const result = await getConnection().getRepository(Evento).save(evento)

        return response.status(200).send(result);
    };
}

export default EventoController;