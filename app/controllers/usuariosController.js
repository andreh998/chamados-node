module.exports.index = function(application, req, res){

    var Usuario = application.config.database.models.Usuario;
    var Perfil = application.config.database.models.Perfil;
    var Departamento = application.config.database.models.Departamento;

    Usuario.buscarTodos(Perfil, Departamento)
    .then(usuarios => {
        res.render('configUsuarios', {usuarios: usuarios});
    }).catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.novo = function(application, req, res){

    var Perfil = application.config.database.models.Perfil;
    var perfis = Perfil.buscarTodos();

    var Departamento = application.config.database.models.Departamento;
    var departamentos = Departamento.buscarTodos();
    
    Promise.all([perfis, departamentos])
    .then(result => {
        res.render('novoUsuario', {perfis: result[0], departamentos: result[1], erros: {}, dados: {}});
    }).catch(err => {
        console.log(err);
        return;
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
        var Perfil = application.config.database.models.Perfil;
        var perfis = Perfil.buscarTodos();
    
        var Departamento = application.config.database.models.Departamento;
        var departamentos = Departamento.buscarTodos();
        
        Promise.all([perfis, departamentos])
        .then(result => {
            res.render('novoUsuario', {perfis: result[0], departamentos: result[1], erros: erros, dados: usuario});
        }).catch(err => {
            console.log(err);
            return;
        });    
    }

    var cryptoController = application.app.controllers.cryptoController;
    var senhaCriptada = cryptoController.crypt(usuario.senha);

    var Usuario = application.config.database.models.Usuario;
    
    if(usuario.id == '' || usuario.id == null){
        Usuario.adicionar(usuario.nome, usuario.cpf, usuario.email, usuario.login, senhaCriptada, usuario.ativo, usuario.id_perfil, usuario.id_depto)
        .then(result => {
            res.redirect('/config/usuarios');
        }).catch(err => {
            console.log(err); 
        });

    } else if(usuario.id != '' || usuario.id > 0){
        Usuario.alterar(usuario.id, usuario.nome, usuario.cpf, usuario.email, usuario.login, senhaCriptada, usuario.ativo, usuario.id_perfil, usuario.id_depto)
        .then(result => {
            res.redirect('/config/usuarios');
        }).catch(err => {
            console.log(err); 
        });
    }
}

module.exports.alterar = function(application, req, res){
    
    var Usuario = application.config.database.models.Usuario;
    Usuario.buscarPorId(req.params.id)
    .then(result => {
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
        //console.log(usuario);

        var Perfil = application.config.database.models.Perfil;
        var perfis = Perfil.buscarTodos();
    
        var Departamento = application.config.database.models.Departamento;
        var departamentos = Departamento.buscarTodos();
        
        Promise.all([perfis, departamentos])
        .then(result => {
            res.render('novoUsuario', {perfis: result[0], departamentos: result[1], erros: {}, dados: usuario});
        }).catch(err => {
            console.log(err);
            return;
        });   

    }).catch(err => {
        console.log(err);
        return;
    });
    
}
