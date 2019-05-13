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

