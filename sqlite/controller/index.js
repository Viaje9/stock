const sqlite3 = require("sqlite3").verbose();
const ISDb = new sqlite3.Database("./database/ISTable.db");
const TMCBb = new sqlite3.Database("./database/TMCTable.db");
const CategoryDb = new sqlite3.Database("./database/Category.db");


class IndexController {
  static async getIS(req, res) {
    const stockId = req.query.id
    const data = await new Promise((resolve, reject) => {
      ISDb.all(`SELECT * FROM ISTable where stockId='${stockId}'`, function (err, row) {
        if (err) reject("QQ");
        resolve(row);
      });
    });
    res.send(data);
  }

  static async getTMC(req, res) {
    const data = await new Promise((resolve, reject) => {
      TMCBb.all(`SELECT * FROM TMCTable where stockId='${stockId}'`, function (err, row) {
        if (err) reject("QQ");
        resolve(row);
      });
    });
    res.send(data);
  }

  static async getMenu(req, res) {
    const data = await new Promise((resolve, reject) => {
      CategoryDb.all(`SELECT * FROM CategoryTable`, function (err, row) {
        if (err) reject("QQ");
        resolve(row);
      });
    });
    res.send(data);
  }
}

module.exports = IndexController