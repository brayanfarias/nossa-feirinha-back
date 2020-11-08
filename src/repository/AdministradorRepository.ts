import { EntityRepository, Repository } from "typeorm";
import Admin from "../entity/Admin";

@EntityRepository(Admin)
export class AdministradorRepository extends Repository<Admin>{

}

export default AdministradorRepository;