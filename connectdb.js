const { Sequelize } = require('sequelize');

const { dbName, dbUser, dbPass, dbPort } = require('./configdb');


// Issue: Doesn't seem to work on other computers
// Instantiate Sequelize, connect to postgres database
// Right now it doesn't create a database, it uses one created prior.
// let dbName = 'todoList';
// const db = new Sequelize('postgres://localhost/' + dbName);

// New test
const db = new Sequelize(dbName, dbUser, dbPass, {
    host: 'localhost',
    dialect: 'postgres',
    port: dbPort
  });

module.exports = { db };