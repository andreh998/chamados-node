const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env._DATABASE, process.env._USER, process.env._PASS, {
    host: process.env._HOST,
    dialect: 'mysql'
});

const loadModels = (sequelize) =>{
    const dir = path.join(__dirname, '../app/models');
    let models = [];
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        model = sequelize.import(modelDir);
        models[model.name] = model;
    });
    return models;
};

database = {sequelize, Sequelize, models: loadModels(sequelize)};

Object.keys(database.models).forEach(key => {
    database.models[key].associate(database.models);
});

module.exports = database;