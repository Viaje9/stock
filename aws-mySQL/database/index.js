const { Sequelize, DataTypes } = require('sequelize');
require("dotenv").config();

const { DB, DB_HOST, DB_PORT, DB_USER, DB_PASS } = process.env;
const sequelize = new Sequelize(DB, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB
});

module.exports = { sequelize, DataTypes }