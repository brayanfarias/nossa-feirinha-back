import { Router } from "express";
import AdministradorController from "./controller/AdministradorController";
import AssinaturaController from './controller/AssinaturaController';
import ConsumidorController from "./controller/ConsumidorController";
import EventoController from "./controller/EventoController";
import ExposicaoController from "./controller/ExposicaoController";
import GondolaController from './controller/GondolaController';
import HortaController from "./controller/HortaController";
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
routes.post('/evento',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), EventoController.createEvento);
routes.patch('/evento', is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), EventoController.updateEvento)
routes.get('/evento/:idEvento', EventoController.getEvento)
routes.get('/evento', EventoController.getEventosAtivos)
routes.delete('/evento/:idEvento',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), EventoController.deleteEventoAndItsRelations)
routes.get('/evento/:idEvento/get-subscribers',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), EventoController.getSubscribersAtivos)

routes.post('/produto',  ProdutoController.create)
routes.get('/produto',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), ProdutoController.getAll)
routes.get('/produto/:idUsuario',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), ProdutoController.getByProdutor)
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


routes.get('/horta/:idUsuario/produtor', HortaController.getByProdutor)
routes.post('/horta', HortaController.create)
routes.get('/horta/:idHorta', HortaController.getHorta)
routes.patch('/horta', HortaController.updateHorta)
routes.patch('/horta/:idHorta', HortaController.settingIsColhido)
routes.delete('/horta/:idHorta', HortaController.deleteHorta)

routes.get('/usuario/:idUsuario', UsuarioController.getById)


export default routes;