
import { Produtor } from "../entity/Produtor";
import { getConnection } from "typeorm";
import { Request, Response } from "express";

class ProdutorController {

    async delete(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const produtor = await getConnection().getRepository(Produtor).findOne(idUsuario)

        const resultDelete = await getConnection().getRepository(Produtor).remove(produtor)

        return response.send(resultDelete).status(200);

    }

    update(arg0: string, update: any) {
        throw new Error('Method not implemented.');
    }

    async create(request: Request, response: Response) {

        const produtor: Produtor = request.body as Produtor;

        const produtorResult = await getConnection().getRepository(Produtor).save(produtor)

        return response.send(produtorResult).status(200);
    }

    async getByEmail(request: Request, response: Response) {

        const email = request.params;

        const result = await getConnection().getRepository(Produtor).find(email)

        return response.send(result).status(200)

    }

    async getByCpf(cpf) {

        const result = await getConnection().getRepository(Produtor).find(cpf)

        return result;
    }

    async getById(idUsuario) {

        const produtor = await getConnection().getRepository(Produtor).findOne(idUsuario)
        
        return produtor;
    }
}

export default ProdutorController;
