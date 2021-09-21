const sqlite3 = require("sqlite3").verbose();
const ISdb = new sqlite3.Database("./database/ISTable.db");
const { getROI } = require("./api/request");

getAllData();

async function getAllData(params) {
  // const data = await getROI()
  console.time('queryTest');
  const data = await new Promise((resolve, reject) => {
    ISdb.all("SELECT * FROM ISTable where stockId='2330'", function (err, row) {
      if (err) reject("QQ");
      resolve(row);
    });
  });
  console.log(data);
  console.timeEnd('queryTest');
}
