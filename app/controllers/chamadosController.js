module.exports.index = function(application, req, res){
    res.render('chamados');
}

module.exports.configIndex = function(application, req, res){
    let promiseAssuntos = new Promise((resolve, reject) => {
        var connection = application.config.dbConnection;
        var AssuntosModel = new application.app.models.AssuntosModel(connection);
        AssuntosModel.getAll(function(err, result){
            if(!err){                
                resolve(result);
            } else {
                reject(err);
                //res.render('novoUsuario');
            }
        });
    });

    let promiseDeptos = new Promise((resolve, reject) => {
        var connection = application.config.dbConnection;
        var DepartamentosModel = new application.app.models.DepartamentosModel(connection);
        DepartamentosModel.getAll(function(err, result){
            if(!err){
                resolve(result);
            } else {
                reject(err);
            }
        });
    });    
    
    Promise.all([promiseAssuntos, promiseDeptos])
        .then(([resultPromiseAssuntos, resultPromiseDeptos])=>{
            res.render('configChamados', {assuntos: resultPromiseAssuntos, departamentos: resultPromiseDeptos});
            return;
        })
        .catch((error)=>{
            console.log(error);
            return;
        });
}

module.exports.gravarAssunto = function(application, req, res){
    var assunto = req.body;

    var connection = application.config.dbConnection;
    var AssuntosModel = new application.app.models.AssuntosModel(connection);
    AssuntosModel.add(assunto, function(err, result){
        if(!err){
            res.redirect('/config/chamados');
        }else{
            console.log(err);
            return;
        }
    });
}