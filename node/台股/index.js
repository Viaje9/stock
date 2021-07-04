const axios = require("axios");
const dayjs = require("dayjs");
const mongoose = require("mongoose");
const Stock = require("./models/Stock");

mongoose.connect("mongodb://localhost:27017/stock", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", start);

function getStock(date) {
  const url = `https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=${date}&type=ALLBUT0999`;
  const config = { headers: { Host: "www.twse.com.tw" } };
  return axios.get(url, config).then(({ data: { data9 } }) => data9);
}

function RemoveComma(text) {
  const newNum = Number(text.split(",").join(""));
  return isNaN(newNum) ? 0 : newNum;
}

// 產生日期清單
function generateDateList() {
  const dateList = [];
  let date = dayjs("2019-01-01");
  while (date.isBefore(dayjs())) {
    const queryTime = date.format("YYYYMMDD");
    const storeTime = date.format("YYYY-MM-DD");
    dateList.push({ queryTime, storeTime });
    date = date.add(1, "day");
  }
  return dateList;
}

// 延遲func
function delay(time, length) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * length);
  });
}

async function start(db) {
  console.log("db connection");
  const dateList = generateDateList();
  for ({ queryTime, storeTime } of dateList) {
    const data = await getStock(queryTime);
    await delay(1000, 3);
    if (data) {
      data.forEach(async (item) => {
        const [ticker, name, ssc, sc, sp, o, h, l, c, , spread, , , , , PER] =
          item;
        const detail = {
          date: storeTime,
          ssc: RemoveComma(ssc),
          sc: RemoveComma(sc),
          sp: RemoveComma(sp),
          o: RemoveComma(o),
          h: RemoveComma(h),
          l: RemoveComma(l),
          c: RemoveComma(c),
          spread: RemoveComma(spread),
          PER: RemoveComma(PER)
        };
        const stockData = {
          ticker,
          name,
          detail
        };
        const queryTicker = await Stock.find({ ticker });
        if (!queryTicker.length) {
          Stock.create(stockData, function (err) {
            if (err) {
              console.log(_id);
            }
          });
        } else {
          Stock.updateOne({ ticker }, { $push: { detail } }, function (err) {
            if (err) {
              console.log(storeTime, _id);
            }
          });
        }
      });
    }
    console.log(`${storeTime} done`);
  }
  console.log("done");
}

// async function test() {}

// 100 08 01

/**
 * [0] 證券代號
 * [1] 證券名稱
 * [2] 成交股數
 * [3] 成交筆數
 * [4] 成交金額
 * [5] 開盤
 * [6] 最高
 * [7] 最低
 * [8] 收盤
 * [10] 漲跌價差
 * [15] 本益比
 */

//  const detail = {
//   date: "2021-06-01",
//   name: "12123",
//   ssc: 123,
//   sc: 123,
//   sp: 123,
//   o: 123,
//   h: 123,
//   l: 123,
//   c: 123,
//   spread: 123,
//   PER: 123
// };

// Stock.updateOne(
//   { ticker: "0050", detail: [{ date: "2021-06-01" }] },
//   { detail }
// ).exec();
