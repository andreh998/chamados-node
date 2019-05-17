function DepartamentosModel(connection){
    this._connection = connection();
}

DepartamentosModel.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM departamentos', callback);
    this._connection.end();
}

module.exports = function(){
    return DepartamentosModel;
}