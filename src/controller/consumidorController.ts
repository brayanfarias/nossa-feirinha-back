
import { Consumidor } from "../entity/Consumidor";
import { getConnection } from "typeorm";
import { Request, Response } from "express";

class ConsumidorController {

    async delete(request: Request, response: Response) {

        const idUsuario = request.params

        const consumidor = await getConnection().getRepository(Consumidor).find(idUsuario)

        const resultDelete = await getConnection().getRepository(Consumidor).remove(consumidor)

        return response.send(resultDelete).status(200);

    }

    update(arg0: string, update: any) {
        throw new Error('Method not implemented.');
    }

    async create(request: Request, response: Response) {

        const consumidor: Consumidor = request.body as Consumidor;

        await getConnection().manager.save(Consumidor, consumidor);

        return response.send(consumidor).status(200);
    }

    async getByEmail(request: Request, response: Response) {

        const email = request.params;

        const result = await getConnection().getRepository(Consumidor).find(email)

        return response.send(result).status(200)

    }

    async getByCpf(cpf) {

        const result = await getConnection().getRepository(Consumidor).find(cpf)

        return result;
    }

    async getById(idUsuario) {

        const consumidor = await getConnection().getRepository(Consumidor).findOne(idUsuario)

        return consumidor;
    }
}

export default ConsumidorController;
