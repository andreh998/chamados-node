
module.exports = function(application){

    const multer = require('multer');

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'app/public/anexos');
        },
        filename: (req, file, callback) => {
            //var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
            callback(null, file.originalname);
        }
    });
    const upload = multer({storage});

    //carrego a funcao que vrifica o token na variavel verificaToken
    var verificaToken = application.app.controllers.tokenController;

    application.get('/chamados', verificaToken, function(req, res){
        application.app.controllers.chamadosController.index(application, req, res);
    });

    application.get('/chamados/novo', verificaToken, function(req, res){
        application.app.controllers.chamadosController.novo(application, req, res);
    });

    application.post('/chamados/assuntos/buscar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.buscarAssuntos(application, req, res);
    });

    application.post('/chamados/novo/gravar',upload.array('anexos', 5), verificaToken, function(req, res){        
        application.app.controllers.chamadosController.gravarChamado(application, req, res);
    });

    application.get('/chamados/interacao/:id', verificaToken, function(req, res){
        application.app.controllers.chamadosController.interacaoChamado(application, req, res);
    });

    application.get('/chamados/meus/buscar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.buscarMeus(application, req, res);
    });

    application.get('/chamados/atribuidos/buscar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.buscarAtribuidos(application, req, res);
    });

    application.post('/chamados/interacao/:id/salvar', verificaToken, function(req, res){
        application.app.controllers.chamadosController.salvarInteracao(application, req, res);
    });

}