require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//criação do middleware para gerenciamento das requisições post
app.use(bodyParser.urlencoded({
    extended: true
}));

const rotas = require('../app/rotas/rotas');
rotas(app);

module.exports = app;