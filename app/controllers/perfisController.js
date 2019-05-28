module.exports.index = function(application, req, res){
    
    var Perfil = application.config.database.models.Perfil;
    Perfil.buscarTodos()
    .then(perfis => {
        res.render('configPerfis', {perfis: perfis});
    }).catch(err => {
        console.log(err);
        return;
    });

}

module.exports.validar = function(application, req, res){

    var perfil = req.body;
    var Perfil = application.config.database.models.Perfil;
    Perfil.adicionar(perfil.nome, perfil.descricao, perfil.ativo)
    .then(result => {
        res.redirect('/config/perfis');
    }).catch(err => {
        console.log(err);
        res.redirect('/config/perfis');
    });

}