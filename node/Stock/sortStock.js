const jsonfile = require('jsonfile')


async function start() {
  const fileUrl = './2330.json'
  const fileStockData = await jsonfile.readFile(fileUrl).then(e => e.flatMap(e => e));
  console.log(fileStockData[90]);
}

start()