
import express = require('express');
import EventoController from "./controller/EventoController";
import ConsumidorController from "./controller/ConsumidorController";
import ProdutorController from "./controller/ProdutorController";

const routes = express.Router();

const consumidorController = new ConsumidorController()
const produtorController = new ProdutorController()
const eventoController =  new EventoController();

routes.post('/consumidor', consumidorController.create);
routes.get('/consumidor/:email', consumidorController.getByEmail);
routes.patch('/consumidor', consumidorController.update)
routes.delete('/consumidor/:idUsuario', consumidorController.delete)

routes.post('/produtor', produtorController.create);
routes.get('/produtor/:email', produtorController.getByEmail);
routes.patch('/produtor', produtorController.update)
routes.delete('/produtor/:idUsuario', produtorController.delete)

routes.post('/evento', eventoController.create);

export default routes;