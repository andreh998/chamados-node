function PerfilModel(connection){
    this._connection = connection();
}

PerfilModel.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM perfis', callback);
}

module.exports = function(){
    return PerfilModel;
}