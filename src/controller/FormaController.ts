import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Forma } from "../entity/Forma";
import { Usuario } from "../entity/Usuario";
import FormaRepository from "../repository/FormaRepository";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService()
const formaRepository = new FormaRepository()

class FormaController  {   
    
    async createForma(request:Request, response:Response) {      
        
        const tipo = request.query.tipo

        if (!tipo || (tipo != formaRepository.formas.ENTREGA && tipo != formaRepository.formas.PAGAMENTO)) return response.status(400).json("Falta parametro correto do tipo da Forma!")
        
        const nomeConvenio = request.body.nomeConvenio

        if(!nomeConvenio) return response.status(400).json("Falta nome do convenio!")

        const idUsuario = request.body.Criador.idUsuario
        
        const usuario: Usuario = await usuarioService.getById(idUsuario);

        const forma:Forma = await getCustomRepository(FormaRepository).createForma(tipo, nomeConvenio, usuario)

        return response.status(200).send(forma)
       
    }



}

export default new FormaController;