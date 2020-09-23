
import { Produtor } from "../entity/Produtor";
import { getConnection } from "typeorm";
import { Request, Response } from "express";

class produtorController {

    async delete(request: Request, response: Response) {

        const idUsuario = request.params

        const produtor = await getConnection().getRepository(Produtor).find(idUsuario)

        const resultDelete = await getConnection().getRepository(Produtor).remove(produtor)

        return response.send(resultDelete).status(200);

    }

    update(arg0: string, update: any) {
        throw new Error('Method not implemented.');
    }

    async create(request: Request, response: Response) {

        const produtor: Produtor = request.body as Produtor;

        await getConnection().manager.save(Produtor, produtor);

        return response.send(produtor).status(200);
    }

    async getByEmail(request: Request, response: Response) {

        const email = request.params;

        const result = await getConnection().getRepository(Produtor).find(email)

        return response.send(result).status(200)

    }
}

export default produtorController;
