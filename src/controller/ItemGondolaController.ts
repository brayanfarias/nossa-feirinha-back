import { getConnection } from "typeorm";
import { ItemGondola } from "../entity/ItemGondola";


export class ItemGondolaController {

    async delete (itemGondola:ItemGondola){

        const result = await getConnection().getRepository(ItemGondola).remove(itemGondola);

        return result;
    }

}

export default ItemGondolaController;