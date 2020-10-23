
import { Router } from "express";
import EventoController from "./controller/EventoController";
import ConsumidorController from "./controller/ConsumidorController";
import ProdutorController from "./controller/ProdutorController";
import ProdutoController from './controller/ProdutoController';
import GondolaController from './controller/GondolaController';
import AssinaturaController from './controller/AssinaturaController';
import SessionController from "./controller/SessionController";
import PermissionController from "./controller/PermissionController";
import RoleController from "./controller/RoleController";
import { is } from "./middleware/permissions";
import AdministradorController from "./controller/AdministradorController";

const routes = Router();

routes.post("/sessions", SessionController.create);
routes.post("/permissions", PermissionController.create);
routes.post("/roles", RoleController.create);

// routes.post("/products", is(["ROLE_ADMIN"]), ProductController.create);
// routes.get(
//   "/products",
//   is(["ROLE_ADMIN", "ROLE_USER"]),
//   ProdutoController.index
// );
// routes.get(
//   "/products/:id",
//   is(["ROLE_ADMIN", "ROLE_USER"]),
//   ProdutoController.show
// );

routes.post('/consumidor', ConsumidorController.create);
routes.get('/consumidor/:email', ConsumidorController.getByEmail);
routes.patch('/consumidor', ConsumidorController.update)
routes.delete('/consumidor/:idUsuario', ConsumidorController.delete)

routes.post('/produtor', ProdutorController.create);
routes.get('/produtor/:email', ProdutorController.getByEmail);
routes.get('/produtor/:idUsuario/gondola', ProdutorController.getGondolasFromThisProdutor)
routes.patch('/produtor', ProdutorController.update)
routes.delete('/produtor/:idUsuario',is(["ROLE_ADMIN"]), ProdutorController.delete)

routes.post('/admin',AdministradorController.create)

routes.post('/evento',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), EventoController.createEvento);
routes.get('/evento/:idEvento',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), EventoController.getEvento)
routes.get('/evento',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), EventoController.getEventosAtivos)
routes.delete('/evento/:idEvento',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), EventoController.deleteEventoAndItsRelations)
routes.get('/evento/:idEvento/get-subscribers',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), EventoController.getSubscribersAtivos)

routes.post('/produto', is(["ROLE_PRODUTOR"]), ProdutoController.create)
routes.get('/produto',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), ProdutoController.getAll)
routes.get('/produto/:idUsuario',is(["ROLE_PRODUTOR","ROLE_CONSUMIDOR"]), ProdutoController.getByProdutor)
routes.delete('/produto/:idProduto', ProdutorController.delete)

routes.post('/gondola', GondolaController.createGondola)
routes.get('/gondola', GondolaController.getGondolas)
routes.get('/gondola/:idGondola', GondolaController.getGondola)
routes.delete('/gondola/:idGondola', GondolaController.deleteGondolaAndItsRelations)
routes.delete('/gondola/:idGondola/item-gondola/:idItemGondola', GondolaController.deleteItemGondolaFromGondola)

routes.post('/assinatura', AssinaturaController.createAssinatura)
routes.patch('/assinatura/:idAssinatura/desassinar', AssinaturaController.desassinarEvento)
routes.patch('/assinatura/:idAssinatura/reassinar', AssinaturaController.reassinarEvento)
routes.get('/assinatura/:idUsuario/?', AssinaturaController.getAllByUsuario)


export default routes;