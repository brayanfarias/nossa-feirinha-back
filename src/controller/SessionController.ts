import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import UsuarioService from "../services/UsuarioService";

class SessionController {
  async create(request: Request, response: Response) {
    const { email , password } = request.body;

    const userRepository = getCustomRepository(UsuarioService);

    const user = await userRepository.findOne(
      { email },
      { relations: ["roles"] }
    );

    if (!user) {
      return response.status(400).json({ error: "User not found!" });
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      return response
        .status(400)
        .json({ error: "Incorrect password or username" });
    }

    const roles = user.roles.map((role) => role.name);

    const token = sign({ roles }, "0b4aececb637fb1496a51ba063d723f5", {
      subject: user.idUsuario,
      expiresIn: "1d",
    });

    return response.json({
      token,
      user,
    });
  }
}

export default new SessionController();
