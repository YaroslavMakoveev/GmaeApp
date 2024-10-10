const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {isEmail: true}},
    password: {type: DataTypes.STRING, allowNull: false, validate: {len: {args: [6], msg: 'Пароль должен содержать нее менее 6 символов'}}},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'},
})

module.exports = {
    Users
}