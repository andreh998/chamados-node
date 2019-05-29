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
            type: DataType.INTEGER
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
    };

    return Chamado;
}