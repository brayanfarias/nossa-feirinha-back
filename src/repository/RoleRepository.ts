import { Repository, EntityRepository } from "typeorm";
import Role from "../entity/Role";

@EntityRepository(Role)
class RoleRepository extends Repository<Role> {

    rolesMapeadas = [
        "ROLE_PRODUTOR",
        "ROLE_CONSUMIDOR",
        "ROLE_ADMINISTRADOR"
    ]
    
    async generateRoles() {

        const roles: Role[] = await this.find()

        if (roles.length == 0) {

            this.rolesMapeadas.forEach(async (item) => {
                const role = new Role();
                role.name = item
                role.description = item;
                role.permission = null;
                await this.save(role);

            })
        } else {
            return;
        }

    }
}

export default RoleRepository;
