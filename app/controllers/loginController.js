
var jwt = require('jsonwebtoken');

module.exports.index = function(application, req, res){

    res.render('login', {campos: {}, erros: {}});

}

module.exports.validaLogin = function(application, req, res){

    var dados = req.body;

    req.assert('username', 'Campo usuário não pode ser vazio').notEmpty();
    req.assert('password', 'Campo senha não pode ser vazio').notEmpty();

    var err = req.validationErrors();

    //console.log(err);

    if(err){
        res.render('login', {campos: dados, erros: err});
        return;
    }

    var connection = application.config.dbConnection;
    var LoginModel = new application.app.models.LoginModel(connection);
    LoginModel.buscar(dados.username, function(err, result){
        if(err){
            console.log(err);
            res.render('login', {campos: dados, erros: {}});
            return;
        } else {
            //crio uma variavel user com o resultado da busca
            var user = result[0];
            //crio a sessao
            req.session.usuario = user;

            var cryptoController = application.app.controllers.cryptoController;
            var senhaDecriptada = cryptoController.decrypt(result[0].senha);

            if(senhaDecriptada === dados.password){
                
                var token = jwt.sign({user}, process.env.SECRET, {
                    expiresIn: "2h"
                });
                /** 
                 * Salvo o token em um cookie que será acessível para validações futuras
                 * O httpOnly impede que o cookie seja acessado do lado do cliente
                 * O secure indica ao navegador que só envie esse cookie em solicitações
                 * https
                 */
                res.cookie('auth', token, {httpOnly: true});
                res.redirect('/');
            } else {          
                erro = [{msg: "Usuário ou senha inválido"}];
                res.render('login', {campos: dados, erros: erro});
                return;
            }
        }
    });

}

module.exports.logout = function(application, req, res){
    req.session.usuario = null;
    //destrói o cookie com o token de atenticação
    res.cookie('auth', {expires: Date.now()});
    res.redirect('/login');
}
