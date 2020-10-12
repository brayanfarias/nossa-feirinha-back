import { Assinatura } from "../entity/Assinatura";
import { Evento } from "../entity/Evento";
import { Usuario } from "../entity/Usuario";
import { getConnection } from "typeorm";
import moment = require('moment');


export class AssinaturaService {
    
    async settingReassinar(assinatura: Assinatura): Promise<Assinatura> {

        assinatura.isAtiva = true;
        assinatura.dataAssinatura = moment().format();
        assinatura.dataDesassinatura = null;

        return await getConnection().getRepository(Assinatura).save(assinatura)

    }

    async settingDesassinar(assinatura: Assinatura): Promise<Assinatura> {

        assinatura.isAtiva = false
        assinatura.dataDesassinatura = moment().format()

        return await getConnection().getRepository(Assinatura).save(assinatura)

    }

    async getById(idAssinatura: string): Promise<Assinatura> {

        return await getConnection().getRepository(Assinatura).findOne(idAssinatura)
    }

    async createAssinatura(evento: Evento, usuario: Usuario): Promise<Assinatura> {

        const assinatura = new Assinatura();

        assinatura.evento = evento;

        assinatura.usuario = usuario;

        assinatura.dataAssinatura = moment().format();

        return await getConnection().getRepository(Assinatura).save(assinatura);

    }

}

export default AssinaturaService