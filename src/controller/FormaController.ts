import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Entrega } from "../entity/Entrega";
import { Forma } from "../entity/Forma";
import { Pagamento } from "../entity/Pagamento";
import Produtor from "../entity/Produtor";
import { Usuario } from "../entity/Usuario";
import FormaRepository from "../repository/FormaRepository";
import ProdutorService from "../services/ProdutorService";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService()
const formaRepository = new FormaRepository()
const produtorService = new ProdutorService()

class FormaController {

    async getFormasByProdutor(request: Request, response: Response) {

        const tipo = request.query.tipo

        if (!tipo || (tipo != formaRepository.formas.ENTREGA && tipo != formaRepository.formas.PAGAMENTO)) return response.status(400).json("Falta parametro correto do tipo da Forma!")

        const idUsuario = request.params.idUsuario

        const produtor: Produtor = await produtorService.getById(idUsuario)

        const formas: Forma[] = await getCustomRepository(FormaRepository).find({ where: { criador: produtor } })

        const result = formas.filter(forma => {

            if (tipo == formaRepository.formas.PAGAMENTO) {
                if (forma instanceof Pagamento) {
                    return forma;
                }
            } else {
                if (forma instanceof Entrega) {
                    return forma;
                }
            }
        })

        return response.status(200).send(result);
    }

    async settingIsAtivo(request: Request, response: Response) {

        const formaRepository = getCustomRepository(FormaRepository)

        const idForma = request.params.idForma

        const forma: Forma = await formaRepository.findOne(idForma);

        const result: Forma = await formaRepository.changeIsAtivo(forma)

        return response.status(200).send(result);
    }

    async createForma(request: Request, response: Response) {

        const tipo = request.query.tipo

        if (!tipo || (tipo != formaRepository.formas.ENTREGA && tipo != formaRepository.formas.PAGAMENTO)) return response.status(400).json("Falta parametro correto do tipo da Forma!")

        const nomeConvenio = request.body.nomeConvenio

        if (!nomeConvenio) return response.status(400).json("Falta nome do convenio!")

        const idUsuario = request.body.Criador.idUsuario

        const usuario: Usuario = await usuarioService.getById(idUsuario);

        const forma: Forma = await getCustomRepository(FormaRepository).createForma(tipo, nomeConvenio, usuario)

        return response.status(200).send(forma)

    }



}

export default new FormaController;