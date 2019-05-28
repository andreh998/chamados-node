module.exports = (sequelize, DataType) => {
    var Assunto = sequelize.define('Assunto', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataType.STRING,
            allowNull: false,
        },
        id_depto: {
            type: DataType.INTEGER,
            allowNull: false
        }
    },{
            sequelize,
            modelName: 'Assunto',
            tableName: 'assuntos',
            timestamps: false
    });

    Assunto.associate = function(models){
        Assunto.belongsTo(models.Departamento, {
            as: 'depto_assunto',
            foreignKey: 'id_depto'
        });

        Assunto.hasMany(models.Chamado, {
            as: 'assunto_chamado',
            foreignKey: 'id_assunto'
        });
    };

    Assunto.buscarTodos = () => {
        return Assunto.findAll();
    };
    
    Assunto.adicionar = (nome, descricao, id_depto) => {
        return Assunto.create({
            nome: nome,
            descricao: descricao,
            id_depto: id_depto
        });
    };

    return Assunto;

};