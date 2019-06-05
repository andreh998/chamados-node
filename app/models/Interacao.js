module.exports = (sequelize, DataType) => {
    var Interacao = sequelize.define('Interacao', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        interacao: {
            type: DataType.TEXT,
            allowNull: false
        },
        data_interacao: {
            type: DataType.DATE
        },
        id_chamado: {
            type: DataType.INTEGER
        }, 
        id_usuario_interacao: {
            type: DataType.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Interacao',
        tableName: 'interacoes',
        timestamps: false
    });

    Interacao.associate = function(models){
        Interacao.belongsTo(models.Chamado, {
            as: 'interacoes_chamado',
            foreignKey: 'id_chamado'
        });

        Interacao.belongsTo(models.Usuario, {
            as: 'usuario_interacao',
            foreignKey: 'id_usuario_interacao'
        });
    };

    Interacao.buscarPorIdChamado = (id_chamado) => {
        return Interacao.findAll({
            where: {
                id_chamado: id_chamado
            }
        });
    };

    Interacao.adicionar = (interacao, id_chamado, id_usuario_interacao) => {
        return Interacao.create({
            interacao: interacao,
            id_chamado: id_chamado,
            id_usuario_interacao: id_usuario_interacao
        });
    };

    return Interacao;
}