import { EntityRepository, Repository } from "typeorm";
import { Evento } from "../entity/Evento";

@EntityRepository(Evento)
class EventoRepository extends Repository<Evento>{


}

export default EventoRepository;