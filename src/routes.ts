
import express = require('express');
import EventoController from "./controller/EventoController";
import ConsumidorController from "./controller/ConsumidorController";
import ProdutorController from "./controller/ProdutorController";
import ProdutoController from './controller/ProdutoController';
import GondolaController from './controller/GondolaController';

const routes = express.Router();

const consumidorController = new ConsumidorController()
const produtorController = new ProdutorController()
const eventoController =  new EventoController();
const produtoController = new ProdutoController();

const gondolaController = new GondolaController()

routes.post('/consumidor', consumidorController.create);
routes.get('/consumidor/:email', consumidorController.getByEmail);
routes.patch('/consumidor', consumidorController.update)
routes.delete('/consumidor/:idUsuario', consumidorController.delete)

routes.post('/produtor', produtorController.create);
routes.get('/produtor/:email', produtorController.getByEmail);
routes.patch('/produtor', produtorController.update)
routes.delete('/produtor/:idUsuario', produtorController.delete)

routes.post('/evento', eventoController.create);
routes.get('/evento/:idEvento', eventoController.get)
routes.delete('/evento/:idEvento', eventoController.delete)

routes.post('/produto', produtoController.create)
routes.get('/produto', produtoController.getAll)
routes.get('/produto/:idUsuario', produtoController.getByProdutor)
routes.delete('/produto/:idProduto', produtoController.delete)

routes.post('/gondola', gondolaController.create)

export default routes;