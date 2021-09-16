const axios = require("axios");
axios.get("http://127.0.0.1:7304/all.json").then((data) => {
  console.log(data);
});
