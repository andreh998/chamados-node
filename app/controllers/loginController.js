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
        }

        if(result[0].senha === dados.password){
            //CRIAR O TOKEN E A SESSAO ANTES DE MANDAR PRA HOME
            res.redirect('/home');
        } else {          
            erro = [{msg: "Usuário ou senha inválido"}];
            res.render('login', {campos: dados, erros: erro});
            return;
        }

    });

}
