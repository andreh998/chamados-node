module.exports.index = function(application, req, res){

    var Departamento = application.config.database.models.Departamento;
    Departamento.buscarTodos()
    .then(departamentos => {
        res.render('configDepartamentos', {deptos: departamentos});
    }).catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.validar = function(application, req, res){

    var departamento = req.body;

    var Departamento = application.config.database.models.Departamento;
    Departamento.adicionar(departamento.nome, departamento.descricao)
    .then(result => {
        res.redirect('/config/departamentos');
    }).catch(err => {
        console.log(err);
        res.redirect('/config/departamentos');
    });

}