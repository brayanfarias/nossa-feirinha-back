import { EntityRepository, getConnection, getCustomRepository, Repository } from "typeorm";
import { Entrega } from "../entity/Entrega";
import { Forma } from "../entity/Forma";
import { Pagamento } from "../entity/Pagamento";
import { Usuario } from "../entity/Usuario";
import moment = require('moment');

@EntityRepository(Forma)
class FormaRepository extends Repository<Forma> {

    formas = {
        PAGAMENTO: "pagamento",
        ENTREGA: "entrega",
    }
    
    async changeIsAtivo(forma: Forma): Promise<Forma> {

        if (forma.isAtivo) {
            forma.isAtivo = false;
        } else {
            forma.isAtivo = true;
        }

        return await this.save(forma)
    }


    async createForma(tipo: any, nomeConvenio: any, usuario: Usuario): Promise<Forma | undefined> {

        if (tipo == this.formas.PAGAMENTO) {

            const pagamento = new Pagamento()
            pagamento.dataCriacao = moment().format();
            pagamento.nomeConvenio = nomeConvenio;
            pagamento.criador = usuario;
            return await getConnection().getRepository(Pagamento).save(pagamento)

        } else {

            const entrega = new Entrega()
            entrega.dataCriacao = moment().format();
            entrega.nomeConvenio = nomeConvenio;
            entrega.criador = usuario;
            return await getConnection().getRepository(Entrega).save(entrega)

        }
    }
}

export default FormaRepository;