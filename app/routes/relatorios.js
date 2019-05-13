

module.exports = function(application){
    //carrego a funcao que vrifica o token na variavel verificaToken
    var verificaToken = application.app.controllers.tokenController;

    application.get('/relatorios', verificaToken, function(req, res){
        application.app.controllers.relatoriosController.index(application, req, res);
    });

}