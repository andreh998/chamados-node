module.exports = (sequelize, DataType) => {
    var Prioridade = sequelize.define('Prioridade', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Prioridade',
        tableName: 'prioridades',
        timestamps: false
    });

    Prioridade.associate = function(models){
        Prioridade.hasMany(models.Chamado, {
            as: 'prioridade_chamado',
            foreignKey: 'id_prioridade'
        });
    };

    Prioridade.buscarTodos = () => {
        return Prioridade.findAll();
    };

    Prioridade.adicionar = (nome) => {
        return Prioridade.create({
            nome: nome
        });
    };

    return Prioridade;
}