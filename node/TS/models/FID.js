const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FID = new mongoose.Schema({
  ticker: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
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
});

module.exports = mongoose.model("FID", FID);
