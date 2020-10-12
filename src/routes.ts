
import express = require('express');
import EventoController from "./controller/EventoController";
import ConsumidorController from "./controller/ConsumidorController";
import ProdutorController from "./controller/ProdutorController";
import ProdutoController from './controller/ProdutoController';
import GondolaController from './controller/GondolaController';
import AssinaturaController from './controller/AssinaturaController';

const routes = express.Router();

const consumidorController = new ConsumidorController();
const produtorController = new ProdutorController();
const eventoController =  new EventoController();
const produtoController = new ProdutoController();
const gondolaController = new GondolaController();
const assinaturaController = new AssinaturaController()

routes.post('/consumidor', consumidorController.create);
routes.get('/consumidor/:email', consumidorController.getByEmail);
routes.patch('/consumidor', consumidorController.update)
routes.delete('/consumidor/:idUsuario', consumidorController.delete)

routes.post('/produtor', produtorController.create);
routes.get('/produtor/:email', produtorController.getByEmail);
routes.get('/produtor/:idUsuario/gondola', produtorController.getGondolasFromThisProdutor)
routes.patch('/produtor', produtorController.update)
routes.delete('/produtor/:idUsuario', produtorController.delete)

routes.post('/evento', eventoController.createEvento);
routes.get('/evento/:idEvento', eventoController.getEvento)
routes.get('/evento', eventoController.getEventosAtivos)
routes.delete('/evento/:idEvento', eventoController.deleteEventoAndItsRelations)

routes.post('/produto', produtoController.create)
routes.get('/produto', produtoController.getAll)
routes.get('/produto/:idUsuario', produtoController.getByProdutor)
routes.delete('/produto/:idProduto', produtoController.delete)

routes.post('/gondola', gondolaController.createGondola)
routes.get('/gondola', gondolaController.getGondolas)
routes.get('/gondola/:idGondola', gondolaController.getGondola)
routes.delete('/gondola/:idGondola', gondolaController.deleteGondolaAndItsRelations)
routes.delete('/gondola/:idGondola/item-gondola/:idItemGondola', gondolaController.deleteItemGondolaFromGondola)

routes.post('/assinatura', assinaturaController.createAssinatura)
routes.patch('/assinatura/:idAssinatura/desassinar', assinaturaController.desassinarEvento)
routes.patch('/assinatura/:idAssinatura/reassinar', assinaturaController.reassinarEvento)

export default routes;