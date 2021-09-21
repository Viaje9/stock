const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:./sqlite-database/ISTable.db"); // Example for sqlite

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.time('queryTest');
  const IS = sequelize.define(
    "ISTable",
    {
      stockId: {
        type: DataTypes.TEXT,
        primaryKey: true
      },
      stockName: DataTypes.TEXT,
      SNOS: DataTypes.TEXT,
      SNOT: DataTypes.TEXT,
      SNOP: DataTypes.TEXT,
      o: DataTypes.TEXT,
      h: DataTypes.TEXT,
      l: DataTypes.TEXT,
      c: DataTypes.TEXT,
      date: DataTypes.TEXT
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  // Find all users
  const data = await IS.findAll({
    where: {
      stockId: '2330'
    }
  });
  console.log(data);
  console.timeEnd('queryTest');
}

start();
