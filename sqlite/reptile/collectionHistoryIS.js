const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../database/ISTable.db");
const { getIS } = require("../api/request");
const {
  delay,
  generateDateList,
  selectIS
} = require("../utils/utils");

db.serialize(start);

async function start() {
  db.run(
    "CREATE TABLE IF NOT EXISTS ISTable (stockId TEXT,stockName TEXT,SNOS TEXT,SNOT TEXT,SNOP TEXT,o TEXT,h TEXT,l TEXT,c TEXT,date TEXT)"
  );
  const dateList = generateDateList('20190101');
  for ({ queryTime, storeTime } of dateList) {
    const data = await getIS(queryTime);
    if (data) {
      const stmt = db.prepare(
        "INSERT INTO ISTable(stockId,stockName,SNOS,SNOT,SNOP,o,h,l,c,date) VALUES (?,?,?,?,?,?,?,?,?,?)"
      );
      data.forEach((e) => {
        stmt.run(...selectIS(e), storeTime);
      });
      console.log(`${storeTime} done`);
      stmt.finalize();
    } else {
      console.log(`${storeTime} is not found data`);
    }
    await delay(1000, 3);
  }
  db.close()
}