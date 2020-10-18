import { Assinatura } from "../entity/Assinatura";
import { Evento } from "../entity/Evento";
import { Usuario } from "../entity/Usuario";
import { getConnection } from "typeorm";
import moment = require('moment');


export class AssinaturaService {
    
    async FilterByIsAtiva(assinaturas: Assinatura[], isAtiva: boolean): Promise<Assinatura[]> {

        const result = assinaturas.filter(assinatura => {
            if (assinatura.isAtiva == isAtiva) {
                return assinatura;
            }
        })

        return result;

    }

    async getAssinaturaWithRelation(idAssinatura: string, relation: string): Promise<Assinatura> {
        return await getConnection().getRepository(Assinatura).findOne(idAssinatura, {relations: [`${relation}`]})
    }

    async getByEvento(evento: Evento): Promise<Assinatura[]> {

        return await getConnection().getRepository(Assinatura).find({ where: { evento: evento } })

    }

    async getByUsuarioFilteredByIsAtiva(usuario: Usuario, isAtiva: boolean): Promise<Assinatura[]> {

        const assinaturas: Assinatura[] = await this.allByUsuario(usuario)

        const result = await this.FilterByIsAtiva(assinaturas, isAtiva)

        return result;

    }

    async allByUsuario(usuario: Usuario): Promise<Assinatura[]> {

        return getConnection().getRepository(Assinatura).find({ where: { usuario: usuario } })

    }

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