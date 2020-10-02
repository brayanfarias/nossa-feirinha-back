import { getConnection } from "typeorm";
import { ItemGondola } from "../entity/ItemGondola";

export class ItemGondolaService {

    async delete (itemGondola:ItemGondola){
                
        const result = await getConnection().getRepository(ItemGondola).remove(itemGondola);

        return result;
    }

    async getById(idItemGondola:string){

        const result = await getConnection().getRepository(ItemGondola).findOne(idItemGondola)

        return result;
    }

}

export default ItemGondolaService;