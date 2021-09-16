const dayjs = require("dayjs");

exports.delay = function (time, length) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * length);
  });
};

exports.formatQueryDate = function (date) {
  return dayjs(date).format("YYYYMMDD");
};

exports.generateDateList = function () {
  const dateList = [];
  let date = dayjs("2020-1-1");
  while (date.isBefore(dayjs())) {
    const queryTime = date.format("YYYYMMDD");
    const storeTime = date.format("YYYY-MM-DD");
    dateList.push({ queryTime, storeTime });
    date = date.add(1, "day");
  }
  return dateList;
};
