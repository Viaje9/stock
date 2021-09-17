const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/data.db");
const { getStock, getTMC } = require("./api/request");
const {
  delay,
  formatQueryDate,
  generateDateList,
  selectItem,
} = require("./utils/utils");

// db.serialize(start);

getAllData();

async function start() {
  db.run(
    "CREATE TABLE IF NOT EXISTS stock (stockid TEXT,stockname TEXT,fib TEXT,fis TEXT,fit TEXT,itb TEXT,its TEXT,itt TEXT,seto TEXT,seob TEXT,seos TEXT,seot TEXT,sehb TEXT,sehs TEXT,seht TEXT,tmle TEXT,date TEXT)"
  );
  const dateList = generateDateList();
  for ({ queryTime, storeTime } of dateList) {
    const data = await getTMC(queryTime);
    if (data) {
      const stmt = db.prepare(
        "INSERT INTO stock(stockid,stockname,fib,fis,fit,itb,its,itt,seto,seob,seos,seot,sehb,sehs,seht,tmle,date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
      );
      data.forEach((e) => {
        stmt.run(...selectItem(e), storeTime);
      });
      console.log(`${storeTime} done`);
      stmt.finalize();
    }
    await delay(1000, 3);
  }
}

async function getAllData(params) {
  const data = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM stock where stockid='2330'", function (err, row) {
      if (err) reject("QQ");
      resolve(row);
    });
  });

  console.log(data);
}
