const mongoose = require("mongoose");
const dayjs = require("dayjs");
const jsonfile = require("jsonfile");
const Stock = require("./models/Stock");
const Ticker = require("./models/Ticker");
const Detail = require("./models/Detail");

mongoose.connect("mongodb://localhost:27017/stock", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", start);

async function start() {
  // const TickerID = await Ticker.findOne({ ticker: "2330" });
  // const data = await Detail.find({ ticker: TickerID._id }).populate("ticker");
  // console.log(data[0]);
  // data
  //   .sort((a, b) => dayjs.unix(a.date) - dayjs.unix(b.date))
  //   .forEach((e) => {
  //     console.log(dayjs(e.date).format("YYYY-MM-DD"));
  //   });
  allData();
}

async function allData() {
  const data = await Detail.find({}).populate("ticker");
  const stockClass = data.reduce((acc, curr) => {
    const ticker = curr.ticker.ticker;
    if (acc.has(ticker)) {
      acc.get(ticker).push(curr);
    } else {
      acc.set(ticker, [curr]);
    }
    return acc;
  }, new Map());
  const jsonData = [];
  for (const [key, val] of stockClass) {
    jsonData.push([key, val]);
  }
  await jsonfile.writeFile("./all.json", jsonData);
  // console.log(stockClass);
  db.close();
}
