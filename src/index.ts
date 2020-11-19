import "reflect-metadata";
import { createConnection, getCustomRepository } from "typeorm";
import routes from './routes';
import express = require('express');
import bodyParser = require('body-parser')
import cors = require('cors');
import RoleRepository from "./repository/RoleRepository";

const app = express();

createConnection().then( async () => await getCustomRepository(RoleRepository).generateRoles())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header('Access-Control-Allow-Headers', "*");
    app.use(cors());
    next();
});

app.use(bodyParser.json({limit: '10mb'}))

app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(express.json());

app.use(routes);

app.listen(3000);


