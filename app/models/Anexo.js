module.exports = (sequelize, DataType) => {
    var Anexo = sequelize.define('Anexo', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_chamado: {
            type: DataType.INTEGER,
            allowNull: false
        },
        nome_arquivo: {
            type: DataType.STRING,
            allowNull: false
        },
        caminho_arquivo: {
            type: DataType.STRING,
            allowNull: false
        },
        caminho_statico: {
            type: DataType.STRING,
            allowNull: false
        }},
    {
        sequelize,
        modelName: 'Anexo',
        tableName: 'anexos',
        timestamps: false
    });

    Anexo.associate = function(models){
        Anexo.belongsTo(models.Chamado, {
            as: 'anexo_chamado',
            foreignKey: 'id_chamado'
        });
    };

    Anexo.adicionar = (id_chamado, nome_arquivo, caminho_arquivo, caminho_statico) => {
        return Anexo.create({
           id_chamado: id_chamado,
           nome_arquivo: nome_arquivo,
           caminho_arquivo: caminho_arquivo,
           caminho_statico: caminho_statico 
        });
    };

    return Anexo;
}