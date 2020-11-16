import { Router } from "express";
import AdministradorController from "./controller/AdministradorController";
import AssinaturaController from './controller/AssinaturaController';
import BalcaoController from "./controller/BalcaoController";
import ConsumidorController from "./controller/ConsumidorController";
import EventoController from "./controller/EventoController";
import ExposicaoController from "./controller/ExposicaoController";
import FormaController from "./controller/FormaController";
import GondolaController from './controller/GondolaController';
import HortaController from "./controller/HortaController";
import PedidoController from "./controller/PedidoController";
import PermissionController from "./controller/PermissionController";
import ProdutoController from './controller/ProdutoController';
import ProdutorController from "./controller/ProdutorController";
import RoleController from "./controller/RoleController";
import SessionController from "./controller/SessionController";
import UsuarioController from "./controller/UsuarioController";
import { is } from "./middleware/permissions";

const routes = Router();

routes.post("/sessions", SessionController.create);
routes.post("/permissions", PermissionController.create);
routes.post("/roles", RoleController.create);

routes.post('/consumidor', ConsumidorController.create);
routes.get('/consumidor/:email', ConsumidorController.getByEmail);
routes.patch('/consumidor', ConsumidorController.update)
routes.delete('/consumidor/:idUsuario', ConsumidorController.delete)

routes.post('/produtor', ProdutorController.create);
routes.get('/produtor/:email', ProdutorController.getByEmail);
routes.delete('/produtor/:idUsuario',is(["ROLE_ADMIN"]), ProdutorController.delete)

routes.post('/admin',AdministradorController.create)

routes.get('/evento/search/?', EventoController.getEventosByProduto)
routes.post('/evento', EventoController.createEvento);
routes.patch('/evento', EventoController.updateEvento)
routes.get('/evento/:idEvento', EventoController.getEvento)
routes.get('/evento', EventoController.getEventosAtivos)
routes.delete('/evento/:idEvento', EventoController.deleteEventoAndItsRelations)
routes.get('/evento/:idEvento/get-subscribers', EventoController.getSubscribersAtivos)

routes.post('/produto',  ProdutoController.create)
routes.get('/produto', ProdutoController.getAll)
routes.get('/produto/:idUsuario', ProdutoController.getByProdutor)
routes.get('/evento/:idEvento/get-gondolas', EventoController.getAllGondolas)
routes.delete('/produto/:idProduto', ProdutorController.delete)

routes.post('/gondola', GondolaController.createGondola)
routes.get('/gondola/:idUsuario/produtor', GondolaController.getGondolasByProdutor)
routes.get('/gondola', GondolaController.getGondolas)
routes.get('/gondola/:idGondola', GondolaController.getGondola)
routes.get('/gondola/:idGondola/get-eventos', GondolaController.getAllEventos)
routes.patch('/gondola', GondolaController.updateGondola)
routes.delete('/gondola/:idGondola', GondolaController.deleteGondolaAndItsRelations)
routes.delete('/gondola/:idGondola/item-gondola/:idItemGondola', GondolaController.deleteItemGondolaFromGondola)

routes.post('/assinatura', AssinaturaController.createAssinatura)
routes.patch('/assinatura/:idAssinatura/desassinar', AssinaturaController.desassinarEvento)
routes.patch('/assinatura/:idAssinatura/reassinar', AssinaturaController.reassinarEvento)
routes.get('/assinatura/:idUsuario/?', AssinaturaController.getAllByUsuario)

routes.post('/exposicao', ExposicaoController.createExposicao)
routes.delete('/exposicao/:idExposicao', ExposicaoController.deleteExposicao)
routes.get('/exposicao/gondola/:idGondola', ExposicaoController.getByGondola)

routes.post('/balcao', BalcaoController.createBalcao)
routes.patch('/balcao/:idBalcao', BalcaoController.settingIsAtivo)
routes.get('/balcao/:idBalcao', BalcaoController.getByIdBalcao)
routes.get('/balcao/:idUsuario/produtor', BalcaoController.getByProdutor)

routes.post('/forma?', FormaController.createForma)
routes.patch('/forma/:idForma', FormaController.settingIsAtivo)
routes.get('/forma/:idUsuario', FormaController.getFormasByProdutor)
    
routes.post('/pedido', PedidoController.createPedido)
routes.get('/pedido/:idPedido', PedidoController.getByIdPedido)

routes.get('/horta/:idUsuario/produtor', HortaController.getByProdutor)
routes.post('/horta', HortaController.create)
routes.get('/horta/:idHorta', HortaController.getHorta)
routes.patch('/horta', HortaController.updateHorta)
routes.patch('/horta/:idHorta', HortaController.settingIsColhido)
routes.delete('/horta/:idHorta', HortaController.deleteHorta)

routes.get('/usuario/:idUsuario', UsuarioController.getById)


export default routes;