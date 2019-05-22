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

UsuariosModel.prototype.update = function(id, nome, cpf, email, login, senha, ativo, id_depto, id_perfil, callback){
    this._connection.query('UPDATE usuarios SET nome = ?, cpf = ?, email = ?, login = ?, senha = ?, ativo = ?, id_depto = ?, id_perfil = ? WHERE id = ?',
    [nome, cpf, email, login, senha, ativo, id_depto, id_perfil, id], callback);
    this._connection.end();
}

UsuariosModel.prototype.findById = function(id, callback){
    this._connection.query('SELECT * FROM usuarios WHERE id = ? ', id, callback);
    this._connection.end();
}

module.exports = function(){
    return UsuariosModel;
}