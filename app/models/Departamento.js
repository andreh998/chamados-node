module.exports = (sequelize, DataType) => {
    var Departamento = sequelize.define('Departamento', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false
        },
        descricao: {
            type: DataType.STRING,
            allowNull: false
        }
    },{
            sequelize,
            modelName: 'Departamento',
            tableName: 'departamentos',
            timestamps: false
    });

    Departamento.associate = function(models){
        Departamento.hasMany(models.Assunto, {
            as: 'depto_assunto',
            foreignKey: 'id_depto'
        });

        Departamento.hasMany(models.Usuario, {
            as: 'depto_usuario',
            foreignKey: 'id_depto'
        });

        Departamento.hasMany(models.Chamado, {
            as: 'chamado_departamento',
            foreignKey: 'id_depto_atribuido'
        });
    };

    Departamento.buscarTodos = () => {
        return Departamento.findAll();
    };

    Departamento.adicionar = (nome, descricao) => {
        return Departamento.create({
            nome: nome,
            descricao: descricao
        });
    };

    return Departamento;
};