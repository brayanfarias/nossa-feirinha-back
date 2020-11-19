import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import RoleRepository from "../repository/RoleRepository";
import PermissionRepository from "../repository/PermissionRepository";
import Role from "../entity/Role";

class RoleController {

  async getAllRoles(request: Request, response: Response) {

    const roles: Role[] = await getCustomRepository(RoleRepository).find();
    return response.status(200).send(roles)

  }

  async create(request: Request, response: Response) {
    const roleRepository = getCustomRepository(RoleRepository);
    const permissionRepository = getCustomRepository(PermissionRepository);

    const { name, description, permissions } = request.body;

    const existRole = await roleRepository.findOne({ name });

    if (existRole) {
      return response.status(400).json({ err: "Role already exists!" });
    }

    const existsPermissions = await permissionRepository.findByIds(permissions);

    const role = roleRepository.create({
      name,
      description,
      permission: existsPermissions,
    });

    await roleRepository.save(role);

    return response.json(role);
  }
}

export default new RoleController();
