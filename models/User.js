const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
// define table propertie here
// it will auto generate the table on start
// if you add extra properties just restart and they will get updated in table
const User = sequelize.define('users', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },

    email: {
        type: Sequelize.STRING,

    },
    password: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    fullName:Sequelize.STRING,
    gender: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});

module.exports = User;