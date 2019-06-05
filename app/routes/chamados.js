
module.exports = function(application){
    //carrego a funcao que vrifica o token na variavel verificaToken
    var verificaToken = application.app.controllers.tokenController;

    application.get('/chamados', verificaToken, function(req, res){
        application.app.controllers.chamadosController.index(application, req, res);
    });

    application.get('/chamados/novo', verificaToken, function(req, res){
        application.app.controllers.chamadosController.novo(application, req, res);
    });

    application.post('/chamados/assuntos/buscar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.buscarAssuntos(application, req, res);
    });

    application.post('/chamados/novo/gravar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.gravarChamado(application, req, res);
    });

    application.get('/chamados/interacao/:id', verificaToken, function(req, res){
        application.app.controllers.chamadosController.interacaoChamado(application, req, res);
    });

    application.get('/chamados/meus/buscar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.buscarMeus(application, req, res);
    });

    application.get('/chamados/atribuidos/buscar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.buscarAtribuidos(application, req, res);
    });

    application.post('/chamados/interacao/:id/salvar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.salvarInteracao(application, req, res);
    });

}