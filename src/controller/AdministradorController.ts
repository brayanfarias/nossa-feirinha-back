
import { Consumidor } from "../entity/Consumidor";
import { getConnection, getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import RoleRepository from "../repository/RoleRepository";
import { hash } from "bcryptjs";
import AdministradorRepository from "../repository/AdministradorRepository";
import Admin from "../entity/Admin";



class AdministradorController {

    async create(request: Request, response: Response) {
        const adminController = getCustomRepository(AdministradorRepository);
        const roleRepository = getCustomRepository(RoleRepository);
        const admin: Admin = request.body as Admin;        

        const existUser = await adminController.findOne({"email": admin.email});

        if (existUser) {
            return response.status(400).json({ message: "Consumidor já cadastrado!" });
        }

        admin.password = await hash(admin.password, 8);
        const existingRole = await roleRepository.findByIds(admin.roles);
        admin.roles = existingRole;
        const adminResult = await adminController.save(admin)
        delete adminResult.password;
        return response.send(adminResult).status(200);
    }

    async delete(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const consumidor = await getConnection().getRepository(Consumidor).findOne(idUsuario)       

        const resultDelete = await getConnection().getRepository(Consumidor).remove(consumidor)
        
        return response.send(resultDelete).status(200);
    }
}

export default new AdministradorController();
