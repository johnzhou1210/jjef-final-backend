const { DataTypes } = require('sequelize');
const { db } = require('../connectdb');

const Entry = db.define('entry', {
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false
    }, 
    priority: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    list_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    entry_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        defaultValue: "white",
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

module.exports = { Entry };
