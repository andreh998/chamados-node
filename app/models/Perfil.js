module.exports = (sequelize, DataType) =>{
    var Perfil = sequelize.define('Perfil', {
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
        }, 
        ativo: {
            type: DataType.STRING,
            allowNull: false
        }
    }, 
        {
            sequelize,
            modelName: 'Perfil',
            tableName: 'perfis',
            timestamps: false
    });

    Perfil.associate = function(models){
        Perfil.hasMany(models.Usuario, {
            as: 'perfil_usuario',
            foreignKey: 'id_perfil'
        });
    };

    Perfil.buscarTodos = () => {
        return Perfil.findAll();
    };

    Perfil.adicionar = (nome, descricao, ativo) => {
        return Perfil.create({
            nome: nome,
            descricao: descricao,
            ativo: ativo
        });
    };

    return Perfil;

};