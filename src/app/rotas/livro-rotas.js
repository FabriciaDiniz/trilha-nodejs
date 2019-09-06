const Livro = require('../modelos/livro');
const LivroDao = require('../infra/livro-dao');

//criando instância do banco de dados
const db = require('../../config/database');

//criando a instância do controlador
const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();

module.exports = (app) => {
    const rotasLivro = LivroControlador.rotas();

    app.get(rotasLivro.lista, 
        livroControlador.lista());

    app.get(rotasLivro.detalhe, 
        livroControlador.detalha());

    app.route(rotasLivro.cadastro)
        .get(livroControlador.formularioCadastro())
        .post(Livro.validacoes(), livroControlador.cadastra())
        .put( Livro.validacoes(), livroControlador.edita());

    app.get(rotasLivro.edicao, 
        livroControlador.formularioEdicao());

    app.delete(rotasLivro.delecao, 
        livroControlador.remove());
}