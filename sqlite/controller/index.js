const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/data.db");

class IndexController {
  static getStock(req, res) {
    res.send("QQ!");
  }

  static async getTMC(req, res) {
    const data = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM stock where stockid='2330'", function (err, row) {
        if (err) reject("QQ");
        resolve(row);
      });
    });
    res.send(data);
  }
}

module.exports = IndexController