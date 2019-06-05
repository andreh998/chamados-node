module.exports.index = function(application, req, res){
    var id_depto_atribuido = req.session.usuario.id_depto;
    var Chamado = application.config.database.models.Chamado;
    var Prioridade = application.config.database.models.Prioridade;
    var Status = application.config.database.models.Status;
    var Assunto = application.config.database.models.Assunto;
    var Usuario = application.config.database.models.Usuario;
    var Departamento = application.config.database.models.Departamento;
    Chamado.buscarPorIdDeptoSemAtribuicao(id_depto_atribuido, Prioridade, Status, Assunto, Usuario, Departamento)
    .then(chamados => {
        res.render('chamados', {chamados: chamados});
    }). catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.configIndex = function(application, req, res){
    
    var Assunto = application.config.database.models.Assunto;
    var assuntos = Assunto.buscarTodos();

    var Departamento = application.config.database.models.Departamento;
    var departamentos = Departamento.buscarTodos();

    var Prioridade = application.config.database.models.Prioridade;
    var prioridades = Prioridade.buscarTodos();

    var Status = application.config.database.models.Status;
    var status = Status.buscarTodos();
    
    Promise.all([assuntos, departamentos, prioridades, status]).then((results) =>{
        console.log()
        res.render('configChamados', {assuntos: results[0], departamentos: results[1], prioridades: results[2], status: results[3]});
    }).catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.gravarAssunto = function(application, req, res){
    var assunto = req.body;

    var Assunto = application.config.database.models.Assunto;
    Assunto.adicionar(assunto.nome, assunto.descricao, assunto.id_depto)
    .then(result => {
        res.redirect('/config/chamados');
    }).catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.gravarStatus = function(application, req, res){
    var status = req.body;

    var Status = application.config.database.models.Status;
    Status.adicionar(status.nome)
    .then(result => {
        res.redirect('/config/chamados');
    }).catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.gravarPrioridade = function(application, req, res){
    var prioridade = req.body;

    var Prioridade = application.config.database.models.Prioridade;
    Prioridade.adicionar(prioridade.nome)
    .then(result => {
        res.redirect('/config/chamados');
    }).catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.novo = function(application, req, res){
    var Status = application.config.database.models.Status;
    var status = Status.buscarTodos();
    var Prioridade = application.config.database.models.Prioridade;
    var prioridades = Prioridade.buscarTodos();
    var Departamento = application.config.database.models.Departamento;
    var departamentos = Departamento.buscarTodos();

    Promise.all([status, prioridades, departamentos]).then(results => {
        res.render('novoChamado', {status: results[0], prioridades: results[1], departamentos: results[2]});
    }).catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.buscarAssuntos = function(application, req, res){
    var id_depto = req.body.id;
    //console.log(id_depto);
    var Assunto = application.config.database.models.Assunto;
    Assunto.buscarPorIdDepartamento(id_depto)
    .then(assuntos => {
        res.send(assuntos);
    }).catch(err =>{
        console.log(err);
        return;
    });    
    
}

module.exports.gravarChamado = function(application, req, res){
    var chamado = req.body;
    chamado.id_usuario_abertura = req.session.usuario.id;
    
    var Chamado = application.config.database.models.Chamado;
    Chamado.adicionar(chamado.titulo, chamado.descricao_problema, chamado.id_usuario_abertura, chamado.id_prioridade, chamado.id_depto_atribuido, chamado.id_assunto, chamado.id_status)
    .then(result => {
        res.redirect('/chamados');
    }).catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.buscarMeus = function(application, req, res){
    var id_usuario_abertura = req.session.usuario.id;
    var Chamado = application.config.database.models.Chamado;
    var Prioridade = application.config.database.models.Prioridade;
    var Status = application.config.database.models.Status;
    var Assunto = application.config.database.models.Assunto;
    var Usuario = application.config.database.models.Usuario;
    var Departamento = application.config.database.models.Departamento;

    Chamado.buscarPorIdUsuarioAbertura(id_usuario_abertura, Prioridade, Status, Assunto, Usuario, Departamento)
    .then(chamados => {
        res.render('tabelaMeusChamados', {chamados: chamados});
    }).catch(err =>{
        console.log(err);
        return;
    });
}

module.exports.buscarAtribuidos = function(application, req, res){
    var id_usuario_atribuido = req.session.usuario.id;
    var Chamado = application.config.database.models.Chamado;
    var Prioridade = application.config.database.models.Prioridade;
    var Status = application.config.database.models.Status;
    var Assunto = application.config.database.models.Assunto;
    var Usuario = application.config.database.models.Usuario;
    var Departamento = application.config.database.models.Departamento;

    Chamado.buscarPorIdUsuarioAtribuido(id_usuario_atribuido, Prioridade, Status, Assunto, Usuario, Departamento)
    .then(chamados => {
        res.render('tabelaChamadosAtribuidos', {chamados: chamados});
    }).catch(err =>{
        console.log(err);
        return;
    });
}

module.exports.interacaoChamado = function(application, req, res){
    var id_chamado = req.params.id;

    var Chamado = application.config.database.models.Chamado;
    var Prioridade = application.config.database.models.Prioridade;
    var Status = application.config.database.models.Status;
    var Assunto = application.config.database.models.Assunto;
    var Usuario = application.config.database.models.Usuario;
    var Departamento = application.config.database.models.Departamento;
    var Interacao = application.config.database.models.Interacao;

    var chamado = Chamado.buscarPorId(id_chamado, Prioridade, Status, Assunto, Usuario, Departamento);
    var status = Status.buscarTodos();
    var prioridades = Prioridade.buscarTodos();
    var departamentos = Departamento.buscarTodos();
    var interacoes = Interacao.buscarPorIdChamado(id_chamado, Usuario);

    /** enviar para a tela a data formatada */

    Promise.all([chamado, status, prioridades, departamentos, interacoes]).then(results => {
        res.render('interacaoChamados', {chamado: results[0], status: results[1], prioridades: results[2], departamentos: results[3], interacoes: results[4]});
    }). catch(err => {
        console.log(err);
        return;
    });
    
}

module.exports.salvarInteracao = function(application, req, res){
    var interacao = req.body;
    var id_chamado = req.params.id;
    
    var Chamado = application.config.database.models.Chamado;

    /** atribuí o chamado ao usuário caso o chamado não tenha atribuição */
    if(interacao.id_usuario_atribuido == '' || interacao.id_usuario_atribuido == null){
        Chamado.alterarResponsavel(id_chamado, req.session.usuario.id)
        .then(result => {
            console.log('Chamado atribuído');
        }). catch(err => {
            console.log(err);
            return;
        });
    }

    /** Altera as demais informações do chamado, como: status, departamento, assunto ou prioridade */
    Chamado.alterar(id_chamado, interacao.id_prioridade, interacao.id_depto_atribuido, 
        interacao.id_assunto, interacao.id_status)
    .then(result => {
        console.log('Chamado alterado');
    }). catch(err => {
        console.log(err);
        return;
    })

    /** Adiciona interação ao chamado */
    var Interacao = application.config.database.models.Interacao;
    Interacao.adicionar(interacao.interacao, id_chamado, req.session.usuario.id)
    .then(result =>{
        res.redirect('/chamados/interacao/'+id_chamado);
    }).catch(err => {
        console.log(err);
        return;
    });    
}

