module.exports = function(application){
        
    application.get('/relatorios', function(req, res){
        application.app.controllers.relatoriosController.index(application, req, res);
    });

}