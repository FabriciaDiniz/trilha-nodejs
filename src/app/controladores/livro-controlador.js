const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const templates = require('../views/templates');

class LivroControlador {

    static rotas() {
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id',
            detalhe: '/livros/:id'
        };
    }

    lista() {
        return function (req, resp) {
            const livroDao = new LivroDao(db);
            livroDao.lista()
            .then(livros => resp.marko(
                templates.livros.lista,
                { livros: livros }
            ))
            .catch(erro => console.log(erro));
        }
    }

    detalha() {
        return function (req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);

            livroDao.buscaPorId(id)
            .then(livro => resp.marko(
                templates.livros.detalhe,
                { livro: livro }
            ))
            .catch(erro => console.log(erro));
        }
    }

    formularioCadastro() {
        return function(req, resp) {
            templates.livros.form, 
            { livro: {} }
        };
    }

    formularioEdicao() {
        return function(req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
        
            livroDao.buscaPorId(id)
                .then(livro => 
                    resp.marko(
                        templates.livros.form,
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
        }
    }

    cadastra() {
        return function(req, resp) {

            const livroDao = new LivroDao(db);
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return resp.marko(
                    templates.livros.form,
                    { 
                        livro: req.body,
                        errosValidação: erros.array()
                    }
                );
            }

            livroDao.adiciona(req.body)
            .then(resp.redirect(LivroControlador.rotas().lista))
            .catch(erro => console.log(erro));
        }
    }

    edita() {
        return function(req, resp) {
            const livroDao = new LivroDao(db);

            livroDao.atualiza(req.body)
            .then(resp.redirect(LivroControlador.rotas().lista))
            .catch(erro => console.log(erro));
        }
    }

    remove() {
        return function (req, resp) {
            const id = req.params.id;
    
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro+"\n erro no método remove"));
        }
    }
}

module.exports = LivroControlador;