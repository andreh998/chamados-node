function PerfilModel(connection){
    this._connection = connection();
}

PerfilModel.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM perfis', callback);
    this._connection.end();
}

module.exports = function(){
    return PerfilModel;
}