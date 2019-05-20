function PerfisModel(connection){
    this._connection = connection();
}

PerfisModel.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM perfis', callback);
    this._connection.end();
}

PerfisModel.prototype.add = function(perfil, callback){
    this._connection.query('INSERT INTO perfis SET ?', perfil, callback);
    this._connection.end();
}

module.exports = function(){
    return PerfisModel;
}