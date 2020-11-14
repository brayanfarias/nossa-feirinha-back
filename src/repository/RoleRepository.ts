import { Repository, EntityRepository } from "typeorm";
import Role from "../entity/Role";

@EntityRepository(Role)
class RoleRepository extends Repository<Role> {}

export default RoleRepository;
