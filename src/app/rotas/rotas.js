const LivroDao = require('../infra/livro-dao');

//criando instância do banco de dados
const db = require('../../config/database');

module.exports = (app) => {
    // Home page
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
    
    // Listagem de livros
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
    
    //Exibe livro
    app.get('/livros/:id', function (req, resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.buscaPorId(id)
        .then(livro => resp.marko(
            require('../views/livros/detalhe.marko'),
            { livro: livro }
        ))
        .catch(erro => console.log(erro));
    });

    //Formulário de cadastro
    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    //Envio formulário de adição
    app.post('/livros', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
        .then(resp.redirect('/livros'))
        .catch(erro => console.log(erro));
    });

    //Atualiza livro
    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
    
        livroDao.buscaPorId(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    
    });

    //Envio formulário de edição
    app.put('/livros', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
        .then(resp.redirect('/livros'))
        .catch(erro => console.log(erro));
    });

    //Remover livro
    app.delete('/livros/:id', function (req, resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
        .then(() => resp.status(200).end())
        .catch(erro => console.log(erro+"\n erro no método remove"));
    });
}