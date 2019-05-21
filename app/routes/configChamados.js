module.exports = function(application){

    var verificaToken = application.app.controllers.tokenController;

    application.get('/chamados', verificaToken, function(req, res){
        application.app.controllers.chamadosController.index(application, req, res);
    });

    application.get('/config/chamados', verificaToken, function(req, res){
        application.app.controllers.chamadosController.configIndex(application, req, res);
    });

    application.post('/config/chamados/assuntos/gravar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.gravarAssunto(application, req, res);
    });

}