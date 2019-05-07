function LoginModel(connection){
    this._connection = connection();
}

LoginModel.prototype.buscar = function(usuario, callback){
    this._connection.query('SELECT * FROM usuarios WHERE usuario = ?', usuario, callback);
    this.connection.close();
}

module.exports = function(){
    return LoginModel;
}