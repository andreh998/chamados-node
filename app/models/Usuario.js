module.exports = (sequelize, DataType) => {
    var Usuario = sequelize.define('Usuario', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false
        },
        cpf: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        login: {
            type: DataType.STRING,
            allowNull: false
        },
        senha: {
            type: DataType.STRING,
            allowNull: false
        },
        ativo: {
            type: DataType.STRING,
            allowNull: false
        },
        id_perfil:{
            type: DataType.INTEGER,
            allowNull: false
        },
        id_depto: {
            type: DataType.INTEGER,
            allowNull: false
        }, 
        data_cadastro: {
            type: DataType.DATE
        },
        data_ultima_alteracao: {
            type: DataType.DATE
        }

    },
        {
            sequelize,
            modelName: 'Usuario',
            tableName: 'usuarios',
            timestamps: false

    }); 

    Usuario.associate = function(models){
        Usuario.belongsTo(models.Perfil, {
            as: 'perfil_usuario',
            foreignKey: 'id_perfil'
        });

        Usuario.belongsTo(models.Departamento, {
            as: 'depto_usuario',
            foreignKey: 'id_depto'
        });

        Usuario.hasMany(models.Chamado, {
            as: 'usuario_abertura_chamado',
            foreignKey: 'id_usuario_abertura'
        });

        Usuario.hasMany(models.Chamado, {
            as: 'usuario_atribuido_chamado',
            foreignKey: 'id_usuario_atribuido'
        });
    };

    Usuario.buscarTodos = () => {
        return Usuario.findAll();
    };

    Usuario.buscarPorLogin = (login) => {
        return Usuario.findAll({
            where: {
                login: login
            }
        });
    };

    Usuario.buscarPorId = (id) => {
        return Usuario.findAll({
            where: {
                id: id
            }
        });
    };

    Usuario.adicionar = (nome, cpf, email, login, senha, ativo, id_perfil, id_depto) => {
        return Usuario.create({
            nome: nome,
            cpf: cpf,
            email: email,
            login: login,
            senha: senha,
            ativo: ativo,
            id_perfil: id_perfil,
            id_depto: id_depto
        });
    };

    Usuario.alterar = (id, nome, cpf, email, login, senha, ativo, id_perfil, id_depto) => {
        return Usuario.update({
            nome: nome,
            cpf: cpf,
            email: email,
            login: login,
            senha: senha,
            ativo: ativo,
            id_perfil: id_perfil,
            id_depto: id_depto
        }, {
            where: {
                id: id
            }
        });
    };

    return Usuario;

};