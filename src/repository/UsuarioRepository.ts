import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../entity/Usuario";

@EntityRepository(Usuario)
class UsuarioRepository extends Repository<Usuario> {


}


export default UsuarioRepository;