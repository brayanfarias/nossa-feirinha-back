import { Request, Response } from "express";
import { getConnection, getCustomRepository, Like } from "typeorm";
import { Produto } from "../entity/Produto";
import ProdutoRepository from "../repository/ProdutoRepository";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export class ProdutoController {

    async getByStringLike(request: Request, response: Response) {

        const string = request.query.product

        if (!string) return response.sendStatus(400)

        const produtos: Produto[] = await getCustomRepository(ProdutoRepository).find({ where: { nome: Like(`%${string}%`) } })

        return response.status(200).send(produtos)

    }    

    async delete(request: Request, response: Response) {
      
        const idProduto = request.params.idProduto

        const produto = await getConnection().getRepository(Produto).findOne(idProduto)

        const result = await getConnection().getRepository(Produto).remove(produto)

        response.status(200).send(result)
    }

   
    async getByProdutor(request: Request, response: Response) {

        const idUsuario = request.params.idUsuario

        const resultPorProdutor = await getConnection().getRepository(Produto).find({ where: { criador: idUsuario } })

        response.status(200).send(resultPorProdutor)

    }

    async getAll( request: Request, response: Response) {

        const result = await getConnection().getRepository(Produto).find()

        response.status(200).send(result);
       
    }
    
    async create (request:Request, response: Response){
    
        const idUsuario = request.body.Criador.idUsuario

        const criadorResult = await usuarioService.getById(idUsuario)
        
        const produto : Produto = request.body
        
        produto.criador = criadorResult

        const result = await getConnection().getRepository(Produto).save(produto)

        response.status(200).send(result)

    }

}

export default new ProdutoController();