function DepartamentosModel(connection){
    this._connection = connection();
}

DepartamentosModel.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM departamentos', callback);
}

module.exports = function(){
    return DepartamentosModel;
}