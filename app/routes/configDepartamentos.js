module.exports = function(application){

    var verificaToken = application.app.controllers.tokenController;

    application.get('/config/departamentos', verificaToken, function(req, res){
        application.app.controllers.departamentosController.index(application, req, res);
    });

    application.post('/config/departamentos/gravar', verificaToken, function(req, res){
        application.app.controllers.departamentosController.validar(application, req, res);
    });

}