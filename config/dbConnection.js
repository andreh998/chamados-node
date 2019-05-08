
var host = process.env._HOST;
//var port = process.env._PORT;
var database = process.env._DATABASE;
var user = process.env._USER;
var password = process.env._PASS;

var mysql = require('mysql');

var connMysql = function(){
    return mysql.createConnection({
        host: host,
        database: database,
        user: user,
        password: password
    });
}

module.exports = function(){
    return connMysql;
}