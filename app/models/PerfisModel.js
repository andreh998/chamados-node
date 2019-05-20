function PerfisModel(connection){
    this._connection = connection();
}

PerfisModel.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM perfis', callback);
    this._connection.end();
}

module.exports = function(){
    return PerfisModel;
}