import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import  { UsuarioService } from "../services/UsuarioService";
import { Usuario } from "../entity/Usuario";


//pega o token da sessao pra verificar se o usuario pode acessar a rota requisitada
//usuario já tem que estar autenticado neste ponto
async function decoder(request: Request): Promise<Usuario | undefined> {
  
  const authHeader = request.headers.authorization || "";
  const userRepository = getCustomRepository(UsuarioService);
  
  //token fica na segunda posição do header por isso o split
  const [, token] = authHeader?.split(" ");

  //retorna o token com o todas as infos
  const payload = decode(token);

  //pega o id do usuario e pesquisa no banco pra verificar qual a role dele
  //payload?.sub = id do usuario
  //relations pega a relacao que o id do usuario tem com a users_roles
  const user = await userRepository.findOne(payload?.sub, {
    relations: ["roles"],
  });

  return user;
}

//Define oque o usuário é
//É executado quando uma requisição é feita em um endpoint que requer autorização.

function is(role: String[]) {

  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {

    const user = await decoder(request);

    //retorna apenas o nome da role do usuario
    const userRoles = user?.roles.map((role) => role.name);

    //veirificar se temm alguma role existente
    const existsRoles = userRoles?.some((r) => role.includes(r));

    if (existsRoles) {
      return next();
    }

    return response.status(401).json({ message: "Not authorized!" });
  };

  return roleAuthorized;
}

export { is };
 