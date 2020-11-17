import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";
import UsuarioRepository from "../repository/UsuarioRepository";


class UsuarioController {

    async updateUsuario(request:Request, response: Response) {
       
        const usuario: Usuario = request.body

        const result: Usuario = await getCustomRepository(UsuarioRepository).save(usuario)

        return response.status(200).send(result)
    }

    async getById(request:Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const usuario:Usuario = await getCustomRepository(UsuarioRepository).findOne(idUsuario)

        return response.status(200).send(usuario);   }


    
}

export default new UsuarioController;