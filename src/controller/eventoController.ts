
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

    async create(request: Request, response: Response) {

        const idUsuario: string = request.body.Criador.idUsuario;

        let criador: Consumidor | Produtor;

        try {
            console.info("Procurando pelo consumidor...");
            criador = await consumidorController.getById(idUsuario);

            if (!criador) {
                console.info("Consumidor não encontrado! Procurando por produtor...");
                criador = await produtorController.getById(idUsuario);
            }

            if (!criador) {
                return response.status(404).send("Não localizei o criador nem como Consumidor nem como Produtor.");
            }

        } catch (error) {
            return response.status(500).send("Problemas para procurar o criador no banco de dados");
        }

        const evento: Evento = request.body as Evento;

        evento.criador = criador;

        const result = await getConnection().manager.save(Evento, evento);

        return response.status(200).send(result);
    };
}

export default EventoController;