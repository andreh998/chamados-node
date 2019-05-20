module.exports = function(application){
    var verificaToken = application.app.controllers.tokenController;

    application.get('/config/perfis', verificaToken, function(req, res){
        application.app.controllers.perfisController.index(application, req, res);
    });

    application.post('/config/perfis/gravar', verificaToken, function(req, res){
        application.app.controllers.perfisController.validar(application, req, res);
    });

}
