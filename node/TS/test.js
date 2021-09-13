const axios = require("axios");
const url = `http://127.0.0.1:5500/node/%E5%8F%B0%E8%82%A1/all.json`;
axios.get(url).then(({data}) => {
  console.log(data);
});