const { DataTypes } = require('sequelize');
const { db } = require('../connectdb');

const List = db.define('list', {
    list_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    entry_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

async function syncList() {
    // use alter to update models in the db when changed
    await List.sync({alter: true});
}

module.exports = { List, syncList };