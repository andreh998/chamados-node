

module.exports = function(application){
    var verificaToken = application.app.controllers.tokenController;

    application.get('/config/usuarios', verificaToken, function(req, res){
        application.app.controllers.usuariosController.index(application, req, res);
    });

    application.get('/config/usuarios/novo', verificaToken, function(req, res){
        application.app.controllers.usuariosController.novo(application, req, res);
    });

    application.post('/config/usuarios/novo/gravar', verificaToken, function(req, res){
        application.app.controllers.usuariosController.validar(application, req, res);
    });

    application.get('/config/usuarios/alterar/:id', verificaToken, function(req, res){
        application.app.controllers.usuariosController.alterar(application, req, res);
    });

}