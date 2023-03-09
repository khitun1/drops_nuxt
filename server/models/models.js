const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const English = sequelize.define('english', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.STRING},
    answer1: {type: DataTypes.STRING},
    answer2: {type: DataTypes.STRING},
    answer3: {type: DataTypes.STRING},
    answer4: {type: DataTypes.STRING},
    rightAnswer: {type: DataTypes.STRING},
    explanation: {type: DataTypes.STRING},
})

const French = sequelize.define('french', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.STRING},
    answer1: {type: DataTypes.STRING},
    answer2: {type: DataTypes.STRING},
    answer3: {type: DataTypes.STRING},
    answer4: {type: DataTypes.STRING},
    rightAnswer: {type: DataTypes.STRING},
    explanation: {type: DataTypes.STRING},
})

const Spanish = sequelize.define('spanish', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.STRING},
    answer1: {type: DataTypes.STRING},
    answer2: {type: DataTypes.STRING},
    answer3: {type: DataTypes.STRING},
    answer4: {type: DataTypes.STRING},
    rightAnswer: {type: DataTypes.STRING},
    explanation: {type: DataTypes.STRING},
})

module.exports = {
    English, French, Spanish
}