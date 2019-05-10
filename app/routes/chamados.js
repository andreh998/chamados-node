module.exports = function(application){

    application.get('/chamados', function(req, res){
        application.app.controllers.chamadosController.index(application, req, res);
    });

}