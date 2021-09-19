const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../database/TMCTable.db");
const { getTMC } = require("../api/request");
const {
  delay,
  generateDateList,
  selectTMC,
} = require("../utils/utils");

db.serialize(start);

async function start() {
  db.run(
    "CREATE TABLE IF NOT EXISTS TMCTable (stockId TEXT,stockName TEXT,FIB TEXT,FIS TEXT,FIT TEXT,ITB TEXT,ITS TEXT,ITT TEXT,SETO TEXT,SEOB TEXT,SEOS TEXT,SEOT TEXT,SEBB TEXT,SEBS TEXT,SEBT TEXT,TMLE TEXT,date TEXT)"
  );
  const dateList = generateDateList('20191013');
  for ({ queryTime, storeTime } of dateList) {
    const data = await getTMC(queryTime);
    if (data) {
      const stmt = db.prepare(
        "INSERT INTO TMCTable(stockId,stockName,FIB,FIS,FIT,ITB,ITS,ITT,SETO,SEOB,SEOS,SEOT,SEBB,SEBS,SEBT,TMLE,date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
      );
      data.forEach((e) => {
        stmt.run(...selectTMC(e), storeTime);
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

