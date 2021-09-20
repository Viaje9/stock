const axios = require("axios");
const iconv = require("iconv-lite");
const cheerio = require("cheerio");

exports.getIS = function (date) {
  const url = `https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=${date}&type=ALLBUT0999`;
  const config = { headers: { Host: "www.twse.com.tw" } };
  return axios.get(url, config).then(({ data: { data9: data } }) => {
    if (Array.isArray(data) && data?.length) {
      try {
        return data.map((e) =>
          e.map((e) => {
            return e.split(",").join("").trim();
          })
        );
      } catch (e) {
        console.log(`${date} format error`);
        return;
      }
    }
    return;
  });
};

exports.getTMC = function (date) {
  const url = `https://www.twse.com.tw/fund/T86?response=json&date=${date}&selectType=ALLBUT0999`;
  const config = { headers: { Host: "www.twse.com.tw" } };
  return axios.get(url, config).then(({ data: { data } }) => {
    if (Array.isArray(data) && data?.length) {
      try {
        return data.map((e) =>
          e.map((e) => {
            return e.split(",").join("").trim();
          })
        );
      } catch (e) {
        console.log(`${date} format error`);
        return;
      }
    }
    return;
  });
};

exports.getROI = function () {
  const url = "https://isin.twse.com.tw/isin/C_public.jsp?strMode=2";
  const config = { responseType: "arraybuffer" };
  return axios.get(url, config).then(({ data }) => {
    const html = iconv.decode(data, "950");
    const $ = cheerio.load(html);
    return Array.from($("tbody tr"))
      .filter((item) => {
        return cheerio.load(item)("td:nth-child(6)").text() === "ESVUFR";
      })
      .map((item) => {
        const e = cheerio.load(item, {
          xml: {
            xmlMode: true
          }
        });
        const [id, name] = e("td:nth-child(1)").text().split("　");
        const category = e("td:nth-child(5)").text();
        return [id, name, category];
      });
  });
};
