import { getConnection, getRepository, ObjectID } from "typeorm";
import { Endereco } from "../entity/Endereco";

class EnderecoController {


    async create (endereco:Endereco) {

        const result = await getConnection().getRepository(Endereco).save(endereco)
        return result;
    }

    async get(idEndereco){
        return await getConnection().getRepository(Endereco).findOne(idEndereco);
    }

    async delete(endereco:Endereco){


        return await getConnection().getRepository(Endereco).remove(endereco);

    }



}


export default new EnderecoController();