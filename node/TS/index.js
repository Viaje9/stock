const axios = require("axios");
const dayjs = require("dayjs");
const mongoose = require("mongoose");
const FID = require("./models/FID");
const TI = require("./models/TI");
const Ticker = require("./models/Ticker");
mongoose.set("useFindAndModify", false);

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

function getTMC(date) {
  const url = `https://www.twse.com.tw/fund/T86?response=json&date=${date}&selectType=ALLBUT0999`;
  const config = { headers: { Host: "www.twse.com.tw" } };
  return axios.get(url, config).then(({ data: { data } }) => data);
}

function RemoveComma(text, ticker) {
  try {
    const newNum = Number(text.split(",").join(""));
    return isNaN(newNum) ? 0 : newNum;
  } catch (e) {
    console.log(ticker);
    return 0;
  }
}

// 產生日期清單
function generateDateList() {
  const dateList = [];
  let date = dayjs("2020-6-25");
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

function organizeDaily(item, storeTime) {
  const [ticker, name, ssc, sc, sp, o, h, l, c, , spread, , , , , PER] = item;
  return {
    ticker,
    date: storeTime,
    ssc: RemoveComma(ssc, ticker),
    sc: RemoveComma(sc, ticker),
    sp: RemoveComma(sp, ticker),
    o: RemoveComma(o, ticker),
    h: RemoveComma(h, ticker),
    l: RemoveComma(l, ticker),
    c: RemoveComma(c, ticker),
    spread: RemoveComma(spread, ticker),
    PER: RemoveComma(PER, ticker)
  };
}

function organizeTMC(item, storeTime) {
  const [
    ticker,
    name,
    fibc,
    fisc,
    fibsc,
    ,
    ,
    ,
    itbc,
    itsc,
    itbsc,
    dbsc,
    sdbc,
    sdsc,
    sdbsc,
    hdbc,
    hdsc,
    hdbsc,
    tmcbs
  ] = item;
  return {
    ticker,
    date: storeTime,
    fibc: RemoveComma(fibc, ticker),
    fisc: RemoveComma(fisc, ticker),
    fibsc: RemoveComma(fibsc, ticker),
    itbc: RemoveComma(itbc, ticker),
    itsc: RemoveComma(itsc, ticker),
    itbsc: RemoveComma(itbsc, ticker),
    dbsc: RemoveComma(dbsc, ticker),
    sdbc: RemoveComma(sdbc, ticker),
    sdsc: RemoveComma(sdsc, ticker),
    sdbsc: RemoveComma(sdbsc, ticker),
    hdbc: RemoveComma(hdbc, ticker),
    hdsc: RemoveComma(hdsc, ticker),
    hdbsc: RemoveComma(hdbsc, ticker),
    tmcbs: RemoveComma(tmcbs, ticker)
  };
}

async function start() {
  const dateList = generateDateList();

  for ({ queryTime, storeTime } of dateList) {
    // const rawData = await getStock(queryTime);
    const rawData = await getTMC(queryTime);
    await delay(1000, 3);
    if (rawData) {
      // const data = rawData.map((item) => organizeDaily(item, storeTime));
      const data = rawData.map((item) => organizeTMC(item, storeTime));
      // await TI.insertMany(data).catch((err) => console.log(storeTime));
      await FID.insertMany(data).catch((err) => console.log(storeTime));

      console.log(`${storeTime} done`);
    }
  }
  console.log("done");
}

//

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

// const data = await getTMC("20190102");
// const item = data.find((e) => e[0] === "0050");
// const [
//   ,
//   ,
//   fibc,
//   fisc,
//   fibsc,
//   ,
//   ,
//   ,
//   itbc,
//   itsc,
//   itbsc,
//   dbsc,
//   sdbc,
//   sdsc,
//   sdbsc,
//   hdbc,
//   hdsc,
//   hdbsc,
//   tmcbs
// ] = item;
// const detail = {
//   fibc: RemoveComma(fibc),
//   fisc: RemoveComma(fisc),
//   fibsc: RemoveComma(fibsc),
//   itbc: RemoveComma(itbc),
//   itsc: RemoveComma(itsc),
//   itbsc: RemoveComma(itbsc),
//   dbsc: RemoveComma(dbsc),
//   sdbc: RemoveComma(sdbc),
//   sdsc: RemoveComma(sdsc),
//   sdbsc: RemoveComma(sdbsc),
//   hdbc: RemoveComma(hdbc),
//   hdsc: RemoveComma(hdsc),
//   hdbsc: RemoveComma(hdbsc),
//   tmcbs: RemoveComma(tmcbs)
// };
// console.log(detail);
// Stock.updateOne(
//   { ticker: "0050", detail: [{ date: "2019-01-02" }] },
//   { detail },
//   function (err) {
//     if (err) {
//       console.log("err");
//     }
//   }
// );
// console.log(data);

// const data = await getStock("20210702");
// const item = data.find((e) => e[0] === "0050");
// const { stockData, detail, ticker } = organizeDaily(item, "2021-07-02");
// const data = await getTMC("20210702");
// const item = data.find((e) => e[0] === "0050");
// const { stockData, detail, ticker } = organizeTMC(item, "2021-07-02");
// const tickerID = await Ticker.findOneAndUpdate({ ticker }, stockData, {
//   new: true,
//   upsert: true
// });

// await Detail.findOneAndUpdate(
//   { ticker: tickerID._id, date: "2021-07-02" },
//   { ticker: tickerID._id, ...detail },
//   { upsert: true }
// );

// async function start() {
//   console.log("Start");

//   const dateList = generateDateList();
//   for ({ queryTime, storeTime } of dateList) {
//     // const data = await getStock(queryTime).catch((err) => {
//     //   console.log(err);
//     // });
//     const data = await getTMC(queryTime).catch((err) => {
//       console.log(err);
//     });
//     await delay(1000, 1);
//     if (data) {
//       // 個股
//       for (item of data) {
//         // const { stockData, detail, ticker } = organizeDaily(item, storeTime);
//         const { stockData, detail, ticker } = organizeTMC(item, storeTime);
//         const tickerID = await Ticker.findOneAndUpdate({ ticker }, stockData, {
//           new: true,
//           upsert: true
//         });
//         await Detail.findOneAndUpdate(
//           { ticker: tickerID._id, date: storeTime },
//           { ticker: tickerID._id, ...detail },
//           { upsert: true }
//         );
//       }
//       console.log(`${storeTime} done`);
//     }
//   }
//   console.log("done");
//   // db.close();
// }
