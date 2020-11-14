
import { Consumidor } from "../entity/Consumidor";
import { getConnection, getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import RoleRepository from "../repository/RoleRepository";
import ConsumidorService from "../services/ConsumidorService"
import { hash } from "bcryptjs";



class ConsumidorController {

    async create(request: Request, response: Response) {
        const consumidorRepository = getCustomRepository(ConsumidorService);
        const roleRepository = getCustomRepository(RoleRepository);
        const consumidor: Consumidor = request.body as Consumidor;        

        const existUser = await consumidorRepository.findOne({"email": consumidor.email});

        if (existUser) {
            return response.status(400).json({ message: "Consumidor já cadastrado!" });
        }

        consumidor.password = await hash(consumidor.password, 8);
        const existingRole = await roleRepository.findByIds(consumidor.roles);
        consumidor.roles = existingRole;
        const consumidorResult = await consumidorRepository.save(consumidor)
        delete consumidor.password;
        return response.send(consumidorResult).status(200);
    }

    async delete(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const consumidor = await getConnection().getRepository(Consumidor).findOne(idUsuario)       

        const resultDelete = await getConnection().getRepository(Consumidor).remove(consumidor)
        
        return response.send(resultDelete).status(200);
    }

    update(arg0: string, update: any) {
        throw new Error('Method not implemented.');
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

    async getById(idUsuario:string) {

        const consumidor = await getConnection().getRepository(Consumidor).findOne(idUsuario)

        return consumidor;
    }
}

export default new ConsumidorController();
