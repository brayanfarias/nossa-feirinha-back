import "reflect-metadata";
import express = require('express');
import bodyParser = require('body-parser')
import routes from './routes'
import cors = require('cors');
import { createConnection } from "typeorm";

const app = express();

createConnection()

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


