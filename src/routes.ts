
import express = require('express');
import consumidorController from "./controller/consumidorController";
import eventoController from "./controller/eventoController";


const routes = express.Router();

routes.post('/consumidor', new consumidorController().create);
routes.get('/consumidor/:email', new consumidorController().getByEmail);
routes.patch('/consumidor', new consumidorController().update)
routes.delete('/consumidor/:idUsuario', new consumidorController().delete)

routes.post('/evento', new eventoController().create);

export default routes;