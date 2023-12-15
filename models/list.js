const { DataTypes } = require('sequelize');
const { db } = require('../connectdb');

const List = db.define('list', {
    list_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

module.exports = { List };