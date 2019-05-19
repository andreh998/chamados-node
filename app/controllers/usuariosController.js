module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection;
    var UsuariosModel = new application.app.models.UsuariosModel(connection);
    UsuariosModel.getAll(function(err, result){
        if(!err){
            res.render('configUsuarios', {usuarios: result}); 
        } else {
            console.log(err);
            res.redirect('/');
        }
    });
}

module.exports.novo = function(application, req, res){

    let promisePerfis = new Promise((resolve, reject) => {
        var connection = application.config.dbConnection;
        var PerfilModel = new application.app.models.PerfilModel(connection);
        PerfilModel.getAll(function(err, result){
            if(!err){                
                resolve(result);
            } else {
                reject(err);
                //res.render('novoUsuario');
            }
        });
    });

    let promiseDeptos = new Promise((resolve, reject) => {
        var connection = application.config.dbConnection;
        var DepartamentosModel = new application.app.models.DepartamentosModel(connection);
        DepartamentosModel.getAll(function(err, result){
            if(!err){
                resolve(result);
            } else {
                reject(err);
            }
        });
    });    
    
    Promise.all([promisePerfis, promiseDeptos])
        .then(([resultPromisePerfis, resultPromiseDeptos])=>{            
            res.render('novoUsuario', {perfis: resultPromisePerfis, departamentos: resultPromiseDeptos, erros: {}, dados: {}});
        })
        .catch((error)=>{
            console.log(error);
            res.render('configUsuarios', {usuarios: result});
        });
}

module.exports.validar = function(application, req, res){
    var usuario = req.body;

    req.assert('nome', 'Campo de Nome não pode ser vazio').notEmpty();
    req.assert('cpf', 'Campo de CPF não pode ser vazio').notEmpty();
    req.assert('email', 'Campo de E-mail não pode ser vazio').notEmpty();
    req.assert('login', 'Campo de Login não pode ser vazio').notEmpty();
    req.assert('senha', 'Campo de Senha não pode ser vazio').notEmpty();
    req.assert('senha', 'Campo de Senha deve ter mais de 8 caracteres').len(8,255);

    var errors = req.validationErrors();

    //console.log(usuario);
    
    if(errors){
        let promisePerfis = new Promise((resolve, reject) => {
            var connection = application.config.dbConnection;
            var PerfilModel = new application.app.models.PerfilModel(connection);
            PerfilModel.getAll(function(err, result){
                if(!err){                
                    resolve(result);
                } else {
                    reject(err);
                    //res.render('novoUsuario');
                }
            });
        });
    
        let promiseDeptos = new Promise((resolve, reject) => {
            var connection = application.config.dbConnection;
            var DepartamentosModel = new application.app.models.DepartamentosModel(connection);
            DepartamentosModel.getAll(function(err, result){
                if(!err){
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });    
        
        Promise.all([promisePerfis, promiseDeptos])
            .then(([resultPromisePerfis, resultPromiseDeptos])=>{
                res.render('novoUsuario', {perfis: resultPromisePerfis, departamentos: resultPromiseDeptos, erros: errors, dados: usuario});
                return;
            })
            .catch((error)=>{
                console.log(error);
                res.render('configUsuarios', {usuarios: result});
                return;
            });
    }

    var crytoController = application.app.controllers.crytoController;
    var senhaCriptada = crytoController.crypt(usuario.senha);
    console.log(senhaCriptada);
    var senhaDecriptada = crytoController.decrypt(senhaCriptada);
    console.log(senhaDecriptada);

}

