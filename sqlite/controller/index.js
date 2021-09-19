// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database("../database/data.db");
// const ISdb = new sqlite3.Database("../database/ISTable.db");


class IndexController {
  static getIS(req, res) {
    console.log(req);
    // const data = await new Promise((resolve, reject) => {
    //   ISdb.all("SELECT * FROM stock where stockid='2330'", function (err, row) {
    //     if (err) reject("QQ");
    //     resolve(row);
    //   });
    // });
    res.send("QQ!");
  }

  static async getTMC(req, res) {
    // const data = await new Promise((resolve, reject) => {
    //   db.all("SELECT * FROM stock where stockid='2330'", function (err, row) {
    //     if (err) reject("QQ");
    //     resolve(row);
    //   });
    // });
    // res.send(data);
    res.send("QQ!");

  }
}

module.exports = IndexController