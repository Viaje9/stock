const { sequelize, DataTypes } = require("../database/index");

const IS = sequelize.define("IS", {
  stockId: DataTypes.TEXT,
  stockName: DataTypes.TEXT,
  SNOS: DataTypes.TEXT,
  SNOT: DataTypes.TEXT,
  SNOP: DataTypes.TEXT,
  o: DataTypes.TEXT,
  h: DataTypes.TEXT,
  l: DataTypes.TEXT,
  c: DataTypes.TEXT,
  date: DataTypes.TEXT
});

module.exports = User