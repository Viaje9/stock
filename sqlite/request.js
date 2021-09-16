const axios = require("axios");


exports.getStock = function (date) {
  const url = `https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=${date}&type=ALLBUT0999`;
  const config = { headers: { Host: "www.twse.com.tw" } };
  return axios.get(url, config).then(({ data: { data9 } }) => data9);
};

exports.getTMC = function (date) {
  const url = `https://www.twse.com.tw/fund/T86?response=json&date=${date}&selectType=ALLBUT0999`;
  const config = { headers: { Host: "www.twse.com.tw" } };
  return axios.get(url, config).then(({ data: { data } }) => data);
};

