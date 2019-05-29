module.exports = (sequelize, DataType) => {
    var Status = sequelize.define('Status', {
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
        modelName: 'Status',
        tableName: 'status',
        timestamps: false
    });

    Status.associate = function(models){
        Status.hasMany(models.Chamado, {
            as: 'status_chamado',
            foreignKey: 'id_status'
        });
    };

    Status.buscarTodos = () => {
        return Status.findAll();
    };

    Status.adicionar = (nome) =>{
        return Status.create({
            nome: nome
        });
    };

    return Status;
}