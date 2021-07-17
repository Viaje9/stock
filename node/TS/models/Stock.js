const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  detail: [
    {
      date: {
        type: Date,
        required: true
      },
      ssc: {
        type: Number
      },
      sc: {
        type: Number
      },
      sp: {
        type: Number
      },
      o: {
        type: Number
      },
      h: {
        type: Number
      },
      l: {
        type: Number
      },
      c: {
        type: Number
      },
      spread: {
        type: Number
      },
      PER: {
        type: Number
      },
      fibc: {
        type: Number
      },
      fisc: {
        type: Number
      },
      fibsc: {
        type: Number
      },
      itbc: {
        type: Number
      },
      itsc: {
        type: Number
      },
      itbsc: {
        type: Number
      },
      dbsc: {
        type: Number
      },
      sdbc: {
        type: Number
      },
      sdsc: {
        type: Number
      },
      sdbsc: {
        type: Number
      },
      hdbc: {
        type: Number
      },
      hdsc: {
        type: Number
      },
      hdbsc: {
        type: Number
      },
      tmcbs: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model("Stock", Schema);
