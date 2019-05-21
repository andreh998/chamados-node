function AssuntosModel(connection){
    this._connection = connection();
}

AssuntosModel.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM assuntos', callback);
    this._connection.end();
}

AssuntosModel.prototype.add = function(assunto, callback){
    this._connection.query('INSERT INTO assuntos SET ?', assunto, callback);
    this._connection.end();
}

module.exports = function(){
    return AssuntosModel;
}