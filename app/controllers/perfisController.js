module.exports.index = function(application, req, res){
    
    var connection = application.config.dbConnection;
    var PerfisModel = new application.app.models.PerfisModel(connection);
    PerfisModel.getAll(function(err, result){
        if(!err){
            res.render('configPerfis', {perfis: result});
        } else {
            console.log(err);
            return;
        }
    });    

}

module.exports.validar = function(application, req, res){

    var perfil = req.body;

    var connection = application.config.dbConnection;
    var PerfisModel = new application.app.models.PerfisModel(connection);
    PerfisModel.add(perfil, function(err, result){
        if(!err){
            res.redirect('/config/perfis');
        }else{
            console.log(err);
            res.redirect('/config/perfis');
        }
    });
}