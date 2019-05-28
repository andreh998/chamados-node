module.exports.index = function(application, req, res){
    res.render('chamados');
}

module.exports.configIndex = function(application, req, res){
    
    var Assunto = application.config.database.models.Assunto;
    var assuntos = Assunto.buscarTodos();

    var Departamento = application.config.database.models.Departamento;
    var departamentos = Departamento.buscarTodos();
    
    Promise.all([assuntos, departamentos]).then((results) =>{
        console.log()
        res.render('configChamados', {assuntos: results[0], departamentos: results[1]});
    }).catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.gravarAssunto = function(application, req, res){
    var assunto = req.body;

    var Assunto = application.config.database.models.Assunto;
    Assunto.adicionar(assunto.nome, assunto.descricao, assunto.id_depto)
    .then(result => {
        res.redirect('/config/chamados');
    }).catch(err => {
        console.log(err);
        return;
    });
    
}