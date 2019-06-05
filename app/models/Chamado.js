module.exports = (sequelize, DataType) => {
    var Chamado = sequelize.define('Chamado', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataType.STRING,
            allowNull: false
        },
        descricao_problema: {
            type: DataType.TEXT,
            allowNull: false
        },
        data_abertura: {
            type: DataType.DATE
        }, 
        data_ultima_interacao: {
            type: DataType.DATE
        },
        data_encerramento: {
            type: DataType.DATE
        },
        id_usuario_abertura: {
            type: DataType.INTEGER,
            allowNull: false
        }, 
        id_depto_atribuido: {
            type: DataType.INTEGER,
            allowNull: false
        },
        id_usuario_atribuido: {
            type: DataType.INTEGER,
            allowNull: true
        },
        id_assunto: {
            type: DataType.INTEGER,
            allowNull: false
        },
        id_status: {
            type: DataType.INTEGER,
            allowNull: false
        },
        id_prioridade: {
            type: DataType.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Chamado',
        tableName: 'chamados',
        timestamps: false
    });

    Chamado.associate = function(models){
        Chamado.belongsTo(models.Usuario, {
            as: 'usuario_abertura_chamado',
            foreignKey: 'id_usuario_abertura'
        });

        Chamado.belongsTo(models.Usuario, {
            as: 'usuario_atribuido_chamado',
            foreignKey: 'id_usuario_atribuido'
        });

        Chamado.belongsTo(models.Departamento, {
            as: 'chamado_departamento',
            foreignKey: 'id_depto_atribuido'
        });

        Chamado.belongsTo(models.Assunto, {
            as: 'assunto_chamado',
            foreignKey: 'id_assunto'
        });

        Chamado.belongsTo(models.Status, {
            as: 'status_chamado',
            foreignKey: 'id_status'
        });

        Chamado.belongsTo(models.Prioridade, {
            as: 'prioridade_chamado',
            foreignKey: 'id_prioridade'
        });

        Chamado.hasMany(models.Interacao, {
            as: 'interacoes_chamado',
            foreignKey: 'id_chamado'
        });
    };

    Chamado.adicionar = (titulo, descricao_problema, id_usuario_abertura, id_prioridade, id_depto_atribuido, id_assunto, id_status) => {
        return Chamado.create({
            titulo: titulo,
            descricao_problema: descricao_problema,
            id_status: id_status,
            id_prioridade: id_prioridade,
            id_usuario_abertura: id_usuario_abertura,
            id_depto_atribuido: id_depto_atribuido,
            id_assunto: id_assunto
        });
    };

    Chamado.alterar = (id_chamado, id_usuario_abertura, id_usuario_atribuido, id_prioridade, id_depto_atribuido, id_assunto, id_status) => {
        return Chamado.update({
            id_status: id_status,
            id_prioridade: id_prioridade,
            id_usuario_abertura: id_usuario_abertura,
            id_usuario_atribuido: id_usuario_atribuido,
            id_depto_atribuido: id_depto_atribuido,
            id_assunto: id_assunto
        }, {
            where: {
                id: id_chamado
            }
        });
    };

    Chamado.buscarPorId = (id, Prioridade, Status, Assunto, Usuario, Departamento) => {
        return Chamado.findAll({
            where: {
                id: id
            },
            include:[{
                model: Prioridade,
                as: 'prioridade_chamado'            
            },{
                model: Status,
                as: 'status_chamado'            
            },{
                model: Assunto,
                as: 'assunto_chamado'            
            },{
                model: Usuario,
                as: 'usuario_abertura_chamado',
                include: {
                    model: Departamento,
                    as: 'depto_usuario'
                }           
            },{
                model: Departamento,
                as: 'chamado_departamento'            
            }]
        });
    };

    Chamado.buscarPorIdDepto = (id, Prioridade, Status, Assunto, Usuario, Departamento) => {
        return Chamado.findAll({
            where: {
                id_depto_atribuido: id
            },
            include:[{
                model: Prioridade,
                as: 'prioridade_chamado'            
            },{
                model: Status,
                as: 'status_chamado'            
            },{
                model: Assunto,
                as: 'assunto_chamado'            
            },{
                model: Usuario,
                as: 'usuario_abertura_chamado'            
            },{
                model: Departamento,
                as: 'chamado_departamento'            
            }]
        });
    };

    Chamado.buscarPorIdDeptoSemAtribuicao = (id, Prioridade, Status, Assunto, Usuario, Departamento) => {
        return Chamado.findAll({
            where: {
                id_depto_atribuido: id,
                id_usuario_atribuido: null
            },
            include:[{
                model: Prioridade,
                as: 'prioridade_chamado'            
            },{
                model: Status,
                as: 'status_chamado'            
            },{
                model: Assunto,
                as: 'assunto_chamado'            
            },{
                model: Usuario,
                as: 'usuario_abertura_chamado'            
            },{
                model: Departamento,
                as: 'chamado_departamento'            
            }]
        });
    };

    Chamado.buscarPorIdUsuarioAtribuido = (id, Prioridade, Status, Assunto, Usuario, Departamento) =>{
        return Chamado.findAll({
            where: {
                id_usuario_atribuido: id
            },
            include:[{
                model: Prioridade,
                as: 'prioridade_chamado'            
            },{
                model: Status,
                as: 'status_chamado'            
            },{
                model: Assunto,
                as: 'assunto_chamado'            
            },{
                model: Usuario,
                as: 'usuario_abertura_chamado'            
            },{
                model: Departamento,
                as: 'chamado_departamento'            
            }]
        });
    };

    Chamado.buscarPorIdUsuarioAbertura = (id, Prioridade, Status, Assunto, Usuario, Departamento) => {
        return Chamado.findAll({
            where: {
                id_usuario_abertura: id
            },
            include:[{
                model: Prioridade,
                as: 'prioridade_chamado'            
            },{
                model: Status,
                as: 'status_chamado'            
            },{
                model: Assunto,
                as: 'assunto_chamado'            
            },{
                model: Usuario,
                as: 'usuario_abertura_chamado'            
            },{
                model: Departamento,
                as: 'chamado_departamento'            
            }]
        });
    };

    return Chamado;
}