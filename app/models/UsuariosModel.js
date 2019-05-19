function UsuariosModel(connection){
    this._connection = connection();
}

UsuariosModel.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM usuarios', callback);
    this._connection.end();
}

UsuariosModel.prototype.add = function(nome, cpf, email, login, senha, ativo, id_depto, id_perfil, callback){
    this._connection.query('INSERT INTO usuarios SET nome = ?, cpf = ?, email = ?, login = ?, senha = ?, ativo = ?, id_depto = ?, id_perfil = ?',
    [nome, cpf, email, login, senha, ativo, id_depto, id_perfil], callback);
    this._connection.end();
}

module.exports = function(){
    return UsuariosModel;
}