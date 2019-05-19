module.exports = function(application){

    var verificaToken = application.app.controllers.tokenController;

    application.get('/config/departamentos', verificaToken, function(req, res){
        application.app.controllers.departamentosController.index(application, req, res);
    });

}