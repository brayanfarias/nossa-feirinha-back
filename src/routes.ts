
import express = require('express');
import consumidorController from "./controller/consumidorController";
import produtorController from "./controller/produtorController";

const routes = express.Router();

routes.post('/consumidor', new consumidorController().create);
routes.get('/consumidor/:email', new consumidorController().getByEmail);
routes.patch('/consumidor', new consumidorController().update)
routes.delete('/consumidor/:idUsuario', new consumidorController().delete)

routes.post('/produtor', new produtorController().create);
routes.get('/produtor/:email', new produtorController().getByEmail);
routes.patch('/produtor', new produtorController().update)
routes.delete('/produtor/:idUsuario', new produtorController().delete)

export default routes;