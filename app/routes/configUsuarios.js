module.exports = function(application){
    application.get('/config/usuarios', function(req, res){
        application.app.controllers.usuariosController.index(application, req, res);
    });
}