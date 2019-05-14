module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection;
    var UsuariosModel = new application.app.models.UsuariosModel(connection);
    UsuariosModel.getAll(function(err, result){
        if(!err){
            res.render('configUsuarios', {usuarios: result}); 
        } else {
            console.log(err);
            res.redirect('/');
        }
    });
}

module.exports.novo = function(application, req, res){
    res.render('novoUsuario');
}

module.exports.validar = function(application, req, res){
    var usuario = req.body;

    req.assert('nome', 'Campo de Nome não pode ser vazio').notEmpty();
    req.assert('cpf', 'Campo de CPF não pode ser vazio').notEmpty();
    req.assert('email', 'Campo de E-mail não pode ser vazio').notEmpty();
    req.assert('login', 'Campo de Login não pode ser vazio').notEmpty();
    req.assert('senha', 'Campo de Senha não pode ser vazio').notEmpty();
    req.assert('senha', 'Campo de Senha deve ter mais de 8 caracteres').len(8,255);

    var erros = req.validationErrors();

    if(erros){
        res.render('novoUsuario')
    }

}

