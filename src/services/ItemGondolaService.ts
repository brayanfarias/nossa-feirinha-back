import { getConnection } from "typeorm";
import { Gondola } from "../entity/Gondola";
import { ItemGondola } from "../entity/ItemGondola";

export class ItemGondolaService {

    async delete(itemGondola: ItemGondola): Promise<ItemGondola> {

        return await getConnection().getRepository(ItemGondola).remove(itemGondola);

    }

    async getById(idItemGondola: string): Promise<ItemGondola> {

        return await getConnection().getRepository(ItemGondola).findOne(idItemGondola)

    }

    async deleteItemGondolaFromGondola(gondola: Gondola, itemGondola: ItemGondola) {
        
        for (const item of gondola.itensGondola) {

            if (item.idItemGondola === itemGondola.idItemGondola) {
                await this.delete(itemGondola)
            }
    
        }

    }

}

export default ItemGondolaService;