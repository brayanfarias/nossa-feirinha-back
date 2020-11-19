import { EntityRepository, Repository } from "typeorm";
import { Evento } from "../entity/Evento";
import { Notificacao } from "../entity/Notificacao";
import { Usuario } from "../entity/Usuario";

@EntityRepository(Notificacao)
class NotificacaoRepository extends Repository<Notificacao> {

    async montarObjetoESalvar(usuario: Usuario, evento: Evento): Promise<Notificacao> {
        
        const notificacao = new Notificacao()

        notificacao.usuario = usuario;

        notificacao.evento = evento;

        return await this.save(notificacao);

    }


}

export default NotificacaoRepository;