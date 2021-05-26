import axiod from "https://deno.land/x/axiod/mod.ts";
function getStock(date, id) {
  const url = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date}&stockNo=${id}`
  const config = { headers: { Host: "www.twse.com.tw" } }
  const data = await axiod.get(url, config).then(({ data: { data } }) => data);
  
}
getStock(20210501,2330)

// function generateDateList() {
//   const dateList = []
//   for (let y = 2010; y < 2022; y++) {
//     for (let m = 1; m < 13; m++) {
//       if ((y === 2021) && (m > 5)) {
//       } else {
//         dateList.push(`${y}${m < 10 ? '0' + m : m}01`)
//       }
//     }
//   }
//   return dateList
// }

// const dateList = generateDateList()

// function delay(time, length) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time * length)
//   });
// }

// dateList.forEach(async (date, i) => {
//   await delay(1000, i)
//   console.log(date);
// })



// async function start() {
//   console.log('start');
//   await delay(1000)
//   console.log('end');
// }
// start();


import {  readJsonSync,writeJsonSync } from 'https://deno.land/x/jsonfile/mod.ts';

// const foo = readJsonSync('./2330.json');

// console.log(foo);
// writeJsonSync('./2330.json', [], { append: true });