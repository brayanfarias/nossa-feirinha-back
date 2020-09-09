import "reflect-metadata";
import { Produtor } from "./entity/Produtor";
import { createConnection } from "typeorm";
import { Assinatura } from "./entity/Assinatura";
import { Evento } from "./entity/Evento";

createConnection().then(async connection => {
const assinatura = new Assinatura();
const produtor = new Produtor();
const evento = new Evento();

produtor.nome="teste"
produtor.telefone="teste"
produtor.email="teste"
produtor.cnpj="teste"
produtor.senha="teste"

await connection.manager.save(Produtor,produtor)

evento.nome="teste";
evento.dataEvento="teste";
evento.latitude="teste";
evento.longitude="teste";
evento.criador=produtor;

await connection.manager.save(Evento,evento)

assinatura.dataAssinatura="teste";
assinatura.dataDesassinatura="teste";
assinatura.isAtivo=false;
assinatura.evento=evento;
assinatura.usuario = produtor;

await connection.manager.save(Assinatura,assinatura)


}).catch(error => console.log(error));

// const app = express();

// app.use(express.json())

// app.post('/', function (request, response) {
//     const produtor: Produtor = request.body as Produtor;

//     createConnection().then(async connection => {

//         const result = await connection.manager.save((Produtor), produtor);
//         console.log(result)

//     })
    

// });

// app.listen(3000);