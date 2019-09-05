require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//criação do middleware para gerenciamento de reqs a arquivos estáticos
app.use('/estatico', express.static('src/app/public'));

//criação do middleware para gerenciamento das requisições post
app.use(bodyParser.urlencoded({
    extended: true
}));

//middleware que detecção se deveria ser adição ou alteração de um livro
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

const rotas = require('../app/rotas/rotas');
rotas(app);

module.exports = app;