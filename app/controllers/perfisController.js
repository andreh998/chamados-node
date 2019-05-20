module.exports.index = function(application, req, res){
    
    var connection = application.confg.dbConnection;
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