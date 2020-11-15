
import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { getConnection, getCustomRepository } from "typeorm";
import { Produtor } from "../entity/Produtor";
import RoleRepository from "../repository/RoleRepository";
import ProdutorService from "../services/ProdutorService";

class ProdutorController {

    async delete(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const produtor = await getConnection().getRepository(Produtor).findOne(idUsuario)

        const resultDelete = await getConnection().getRepository(Produtor).remove(produtor)

        return response.send(resultDelete).status(200);

    }

    async create(request: Request, response: Response) {
        const produtorRepository = getCustomRepository(ProdutorService);
        const roleRepository = getCustomRepository(RoleRepository);
        const produtor: Produtor = request.body as Produtor;

        const existUser = await produtorRepository.findOne({"email": produtor.email});

        if (existUser) {
            return response.status(400).json({ message: "Produtor já cadastrado!" });
        }
        
        produtor.password = await hash(produtor.password, 8);
        const existingRole = await roleRepository.findByIds(produtor.roles);
        produtor.roles = existingRole;
        const produtorResult = await produtorRepository.save(produtor)
        delete produtorResult.password;
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


}

export default new ProdutorController();
