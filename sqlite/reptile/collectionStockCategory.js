const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../database/Category.db");
const { getROI } = require("../api/request");

db.serialize(start);

async function start() {
  const data = await getROI();
  await new Promise((resolve) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS CategoryTable (stockId TEXT,stockName TEXT,category TEXT)",
      resolve
    );
  });
  const stmt = db.prepare(
    "INSERT INTO CategoryTable(stockId,stockName,category) VALUES (?,?,?)"
  );
  data.forEach((e) => {
    stmt.run(...e);
  });
  stmt.finalize();
  // db.close();
  // console.log("done");
}
