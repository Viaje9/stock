const dayjs = require("dayjs");

exports.delay = function (time, length) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * length);
  });
};

exports.formatQueryDate = function (date) {
  return dayjs(date).format("YYYYMMDD");
};

exports.generateDateList = function (startDate) {
  const dateList = [];
  let date = dayjs(startDate);
  while (date.isBefore(dayjs())) {
    const queryTime = date.format("YYYYMMDD");
    const storeTime = date.format("YYYY-MM-DD");
    dateList.push({ queryTime, storeTime });
    date = date.add(1, "day");
  }
  return dateList;
};

exports.selectTMC = function (e) {
  return [
    e[0],
    e[1],
    e[2],
    e[3],
    e[4],
    e[8],
    e[9],
    e[10],
    e[11],
    e[12],
    e[13],
    e[14],
    e[15],
    e[16],
    e[17],
    e[18],
  ];
};

exports.selectIS = function (e) {
  return [
    e[0],
    e[1],
    e[2],
    e[3],
    e[4],
    e[5],
    e[6],
    e[7],
    e[8],
  ];
};
