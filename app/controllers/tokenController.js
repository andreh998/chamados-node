var jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    //recupero o token do cookie
    var token = req.cookies['auth'];
    //console.log(token);
    //verifico se o token existe, se não existir retorno um erro
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

    //se o token existir tento decriptar
    jwt.verify(token, process.env.SECRET, function(err, decoded){
        //se der erro para decriptar retorno um erro
        if(err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        //se ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

module.exports = function(){
    return verifyJWT;
}