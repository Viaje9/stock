const axios = require("axios");


exports.getIS = function (date) {
  const url = `https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=${date}&type=ALLBUT0999`;
  const config = { headers: { Host: "www.twse.com.tw" } };
  return axios.get(url, config).then(({ data: { data9: data } }) => {
    if (Array.isArray(data) && data?.length) {
      try {
        return data.map(e => e.map(e => {
          return e.split(",").join("").trim()
        }))
      } catch (e) {
        console.log(`${date} format error`);
        return
      }
    }
    return
  });
};

exports.getTMC = function (date) {
  const url = `https://www.twse.com.tw/fund/T86?response=json&date=${date}&selectType=ALLBUT0999`;
  const config = { headers: { Host: "www.twse.com.tw" } };
  return axios.get(url, config).then(({ data: { data } }) => {
    if (Array.isArray(data) && data?.length) {
      try {
        return data.map(e => e.map(e => {
          return e.split(",").join("").trim()
        }))
      } catch (e) {
        console.log(`${date} format error`);
        return
      }
    }
    return
  });
};

