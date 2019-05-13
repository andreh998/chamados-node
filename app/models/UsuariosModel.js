function UsuariosModel(connection){
    this._connection = connection();
}

UsuariosModel.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM usuarios', callback);
}

module.exports = function(){
    return UsuariosModel;
}