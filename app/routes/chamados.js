
module.exports = function(application){
    //carrego a funcao que vrifica o token na variavel verificaToken
    var verificaToken = application.app.controllers.tokenController;

    application.get('/chamados', verificaToken, function(req, res){
        application.app.controllers.chamadosController.index(application, req, res);
    });

}