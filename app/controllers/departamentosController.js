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