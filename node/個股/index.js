const jsonfile = require('jsonfile')
const axios = require("axios");

function getStock(date, id) {
  const url = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date}&stockNo=${id}`
  const config = { headers: { Host: "www.twse.com.tw" } }
  return axios.get(url, config).then(({ data: { data } }) => data);
}

function generateDateList() {
  const dateList = []
  for (let y = 2021; y < 2022; y++) {
    for (let m = 1; m < 13; m++) {
      if ((y === 2021) && (m > 5)) {
      } else {
        dateList.push(`${y}${m < 10 ? '0' + m : m}01`)
      }
    }
  }
  return dateList
}

const dateList = generateDateList()

function delay(time, length) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * length)
  });
}

async function start() {
  const fileUrl = './2330.json'
  for (date of dateList) {
    console.log(date);
    const fileStockData = await jsonfile.readFile(fileUrl);
    const newStockData = await getStock(date, 2330)
    fileStockData.push(newStockData)
    await jsonfile.writeFile(fileUrl, fileStockData);
    await delay(1000, 1)
  }
  console.log('done');
}

start()

// async function name() {

//   // const data = await jsonfile.readFile(fileUrl);
//   console.log(data);
//   // await jsonfile.writeFile(fileUrl, []);
//   // await jsonfile.writeFile(fileUrl, [1, 2, 3]);
//   // await jsonfile.writeFile(fileUrl, [1]);
// }

// name()