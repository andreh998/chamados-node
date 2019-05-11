module.exports = function(application){
    application.get('/configuracoes/usuarios', function(req, res){
        application.app.controllers.usuariosController.index(application, req, res);
    });
}