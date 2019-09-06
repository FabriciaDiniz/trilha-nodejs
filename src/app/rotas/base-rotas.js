//criando a instância do controlador base
const BaseControlador = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();

module.exports = (app) => {
    const rotasBase = BaseControlador.rotas();

    app.get(rotasBase.home, baseControlador.home());

};