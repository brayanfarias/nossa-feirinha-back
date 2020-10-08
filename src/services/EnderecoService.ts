import { getConnection } from "typeorm";
import { Endereco } from "../entity/Endereco";

export class EnderecoService {

    async create(endereco: Endereco): Promise<Endereco> {

        return await getConnection().getRepository(Endereco).save(endereco);
        
    }

    async delete(endereco: Endereco): Promise<Endereco> {

        return await getConnection().getRepository(Endereco).remove(endereco);
    }



}

export default EnderecoService;