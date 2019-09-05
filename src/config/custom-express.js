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

//middleware para erro 404
app.use(function (req, resp, next) {
    return resp.status(404).marko(
        require('../app/views/base/erros/404.marko')
    );
});

//middleware para erro 500
//precisa passar as 4 variáveis pro express diferenciar a parte do tratamento de erros
app.use(function (erro, req, resp, next) {
    return resp.status(500).marko(
        require('../app/views/base/erros/500.marko')
    );
});

module.exports = app;