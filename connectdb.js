const { Sequelize } = require('sequelize');

// Instantiate Sequelize, connect to postgres database
// Right now it doesn't create a database, it uses one created prior.
let dbName = 'todoList';
const db = new Sequelize('postgres://localhost/' + dbName);

module.exports = { db };