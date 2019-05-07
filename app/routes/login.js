module.exports = function(application){

    application.get('/login', function(req, res){
        application.app.controllers.loginController.index(application, req, res);
    });

    application.get('/validaLogin', function(req, res){
        res.redirect('/login');
    });

    application.post('/validaLogin', function(req, res){
        application.app.controllers.loginController.validaLogin(application, req, res);
    });

}