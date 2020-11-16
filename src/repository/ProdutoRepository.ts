import { EntityRepository, Repository } from "typeorm";
import Produto from "../entity/Produto";

@EntityRepository(Produto)
class ProdutoRepository extends Repository<Produto>{



}

export default ProdutoRepository;