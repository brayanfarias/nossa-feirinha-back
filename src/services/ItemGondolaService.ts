import { getConnection } from "typeorm";
import { ItemGondola } from "../entity/ItemGondola";

export class ItemGondolaService {

    async delete(itemGondola: ItemGondola): Promise<ItemGondola> {

        return await getConnection().getRepository(ItemGondola).remove(itemGondola);

    }

    async getById(idItemGondola: string): Promise<ItemGondola> {

        return await getConnection().getRepository(ItemGondola).findOne(idItemGondola)

    }

}

export default ItemGondolaService;