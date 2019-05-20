module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection;
    var DepartamentosModel = new application.app.models.DepartamentosModel(connection);
    DepartamentosModel.getAll(function(err, result){
        if(!err){
            res.render('configDepartamentos', {deptos: result});
        } else {
            console.log(err);
            return;
        }
    });    

}

module.exports.validar = function(application, req, res){

    var departamento = req.body;

    var connection = application.config.dbConnection;
    var DepartamentosModel = new application.app.models.DepartamentosModel(connection);
    DepartamentosModel.add(departamento, function(err, result){
        if(!err){
            res.redirect('/config/departamentos');
        } else {
            console.log(err);
            res.redirect('/config/departamentos');
        }
    });
}