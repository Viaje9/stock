const jsonfile = require('jsonfile')
const axios = require("axios");
const dayjs = require("dayjs");

function getT86(date) {
  const url = `https://www.twse.com.tw/fund/T86?response=json&date=${date}&selectType=ALL`
  const config = { headers: { Host: "www.twse.com.tw" } }
  return axios.get(url, config).then(({ data: { data } }) => data);
}

function generateDateList(startTime, endTime) {
  const dateList = []
  let index = dateList.length
  dateList.push(startTime)
  while (dateList[index] !== endTime) {
    const day = dayjs(dateList[index]).add(1, 'day').format('YYYYMMDD')
    dateList.push(day)
    index++
  }
  return dateList
}

function delay(time, length) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * length)
  });
}

async function start() {
  const dateList = generateDateList('20210327', '20210525')
  const fileUrl = './T86.json'
  for (date of dateList) {
    console.log(date);
    const fileStockData = await jsonfile.readFile(fileUrl);
    const newStockData = await getT86(date)
    if (newStockData)
      fileStockData.push(newStockData.find(e => e[0] === '2330'))
    await jsonfile.writeFile(fileUrl, fileStockData);
    await delay(3000, 1)
  }
  console.log('done');
}

start()

