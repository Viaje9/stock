const { getStock, getTMC } = require("../api/request");

async function start() {
  const data = await getTMC('20210901');
}

start()