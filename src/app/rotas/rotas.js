const LivroDao = require('../infra/livro-dao');

//criando instância do banco de dados
const db = require('../../config/database')

module.exports = (app) => {
    app.get('/', function (req, resp) {
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body> 
            </html>
        `);
    });
    
    app.get('/livros', function (req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.lista()
        .then(livros => resp.marko(
            require('../views/livros/lista/lista.marko'),
            {
                livros: livros
            }
        ))
        .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../views/livros/form/form.marko'));
    });

    app.post('/livros', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
        .then(resp.redirect('/livros'))
        .catch(erro => console.log(erro));
    });

    app.get('/livros/${id}', function (req, resp, id) {
        const livroDao = new LivroDao(db);
        livroDao.buscaPorId(id)
        .then(livro => resp.marko(
            require('../views/livros/detalhe.marko'),
            {
                livro: livro
            }
        ))
        .catch(erro => console.log(erro));
    });

    app.get('/livros/${id}/delete', function (req, resp, id) {
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
        .then(resp.redirect('/livros'))
        .catch(erro => console.log(erro));
    });
}