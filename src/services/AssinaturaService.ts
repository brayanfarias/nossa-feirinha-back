import { Assinatura } from "../entity/Assinatura";
import { Evento } from "../entity/Evento";
import { Usuario } from "../entity/Usuario";
import { getConnection } from "typeorm";
import moment = require('moment');


export class AssinaturaService {

    async createAssinatura(evento: Evento, usuario: Usuario): Promise<Assinatura> {

        const assinatura = new Assinatura();

        assinatura.evento = evento;

        assinatura.usuario = usuario;

        assinatura.dataDesassinatura = moment().format();

        return await getConnection().getRepository(Assinatura).save(assinatura);

    }

}

export default AssinaturaService