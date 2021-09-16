const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TI = new mongoose.Schema({
  ticker: {
    type: String,
    required: true
  },
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
  }
});

module.exports = mongoose.model("TI", TI);
