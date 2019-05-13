

module.exports = function(application){
    //carrego a funcao que vrifica o token na variavel verificaToken
    var verificaToken = application.app.controllers.tokenController;

    application.get('/', verificaToken, function(req, res){
        application.app.controllers.homeController.index(application, req, res);
    });
}