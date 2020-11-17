import "reflect-metadata";
import express = require('express');
import bodyParser = require('body-parser')
import routes from './routes'
import { createConnection } from "typeorm";

const app = express();

createConnection()

app.use(bodyParser.json({limit: '10mb'}))

app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(express.json());

app.use(routes);

app.listen(3000);


