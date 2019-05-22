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
        var PerfisModel = new application.app.models.PerfisModel(connection);
        PerfisModel.getAll(function(err, result){
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
            var PerfisModel = new application.app.models.PerfisModel(connection);
            PerfisModel.getAll(function(err, result){
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

    var cryptoController = application.app.controllers.cryptoController;
    var senhaCriptada = cryptoController.crypt(usuario.senha);

    var connection = application.config.dbConnection;
    var UsuariosModel = new application.app.models.UsuariosModel(connection);
    
    if(usuario.id == '' || usuario.id == null){
        UsuariosModel.add(usuario.nome, usuario.cpf, usuario.email, usuario.login, senhaCriptada, usuario.ativo, usuario.id_depto, usuario.id_perfil, function(err, result){
            if(!err){
                res.redirect('/config/usuarios');
            } else {
                console.log(err);            
            }
        });
    } else if(usuario.id != '' || usuario.id > 0){
        UsuariosModel.update(usuario.id, usuario.nome, usuario.cpf, usuario.email, usuario.login, senhaCriptada, usuario.ativo, usuario.id_depto, usuario.id_perfil, function(err, result){
            if(!err){
                res.redirect('/config/usuarios');
            } else {
                console.log(err);            
            }
        });
    }
    
    
}

module.exports.alterar = function(application, req, res){
    var connection = application.config.dbConnection;
    var UsuariosModel = new application.app.models.UsuariosModel(connection);
    UsuariosModel.findById(req.params.id, function(err, result){

        var cryptoController = application.app.controllers.cryptoController;
        var senhaDecriptada = cryptoController.decrypt(result[0].senha);

        var usuario = {};
        usuario.id = result[0].id;
        usuario.nome = result[0].nome;
        usuario.cpf = result[0].cpf;
        usuario.email = result[0].email;
        usuario.login = result[0].login;
        usuario.senha = senhaDecriptada;
        usuario.ativo = result[0].ativo;
        usuario.id_perfil = result[0].id_perfil;
        usuario.id_depto = result[0].id_depto;
        console.log(usuario);
        
        if(!err){
            let promisePerfis = new Promise((resolve, reject) => {
                var connection = application.config.dbConnection;
                var PerfisModel = new application.app.models.PerfisModel(connection);
                PerfisModel.getAll(function(err, result){
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
                    res.render('novoUsuario', {perfis: resultPromisePerfis, departamentos: resultPromiseDeptos, erros: {}, dados: usuario});
                    return;
                })
                .catch((error)=>{
                    console.log(error);
                    res.render('configUsuarios', {usuarios: result});
                    return;
                });
        }else{
            console.log(err);
            res.render('configUsuarios', {usuarios: result});
        }
    });
}
