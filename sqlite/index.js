const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data.db");
const { getStock, getTMC } = require("./request");
const { delay, formatQueryDate, generateDateList } = require("./utils");

db.serialize(start);

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
      stmt.finalize();
      console.log(`${storeTime} done`);
    }
    await delay(1000, 3);
  }
  db.each("SELECT rowid AS stockid, date FROM stock", function (err, row) {
    console.log(row.id + ": " + row.info);
  });
  // const dateList = generateDateList()
  // console.log(dateList);
}

function selectItem(e) {
  return [
    e[0],
    e[1],
    e[2],
    e[3],
    e[4],
    e[8],
    e[9],
    e[10],
    e[11],
    e[12],
    e[13],
    e[14],
    e[15],
    e[16],
    e[17],
    e[18]
  ];
}

start();
