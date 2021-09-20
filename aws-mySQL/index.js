
const { Sequelize } = require('sequelize');
require("dotenv").config();

const { DB, DB_HOST, DB_PORT, DB_USER, DB_PASS } = process.env;
const sequelize = new Sequelize(DB, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

