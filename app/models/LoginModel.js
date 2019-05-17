function LoginModel(connection){
    this._connection = connection();
}

LoginModel.prototype.buscar = function(usuario, callback){
    this._connection.query('SELECT * FROM usuarios WHERE login = ?', usuario, callback);
    this._connection.end();
}

module.exports = function(){
    return LoginModel;
}