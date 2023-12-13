const { Sequelize } = require('sequelize');

const { dbName, dbUser, dbPass, dbPort } = require('./configdb');

const db = new Sequelize(dbName, dbUser, dbPass, {
    host: 'localhost',
    dialect: 'postgres',
    port: dbPort
  });

module.exports = { db };