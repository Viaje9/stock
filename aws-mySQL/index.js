const mysql = require("mysql");
require("dotenv").config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASS } = process.env;
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  port: DB_PORT
});

connection.connect(function (err) {
  if (err) {
    console.error(err.stack);
    return;
  }
  console.log("Connected!");
  connection.end();
});
