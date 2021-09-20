const sqlite3 = require("sqlite3").verbose();
const ISdb = new sqlite3.Database("./database/ISTable.db");
const TMCdb = new sqlite3.Database("./database/TMCTable.db");

class IndexController {
  static async getIS(req, res) {
    const stockId = req.query.id
    const data = await new Promise((resolve, reject) => {
      ISdb.all(`SELECT * FROM ISTable where stockId='${stockId}'`, function (err, row) {
        if (err) reject("QQ");
        resolve(row);
      });
    });
    res.send(data);
  }

  static async getTMC(req, res) {
    const data = await new Promise((resolve, reject) => {
      TMCdb.all(`SELECT * FROM TMCTable where stockId='${stockId}'`, function (err, row) {
        if (err) reject("QQ");
        resolve(row);
      });
    });
    res.send(data);
  }
}

module.exports = IndexController