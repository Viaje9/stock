// ./models/Animal.js
const mongoose = require('mongoose');

let AnimalSchema = new mongoose.Schema({
  size: String,
  mass: Number,
  category: {
    type: String,
    default: 'on land',
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// // 添加 instance method (給 document 用的方法)
// AnimalSchema.methods.getCategory = function () {
//   // 這裡的 this 指透過這個 function constructor 建立的物件
//   console.log(`This animal is belongs to ${this.category}`);
// };

// 添加 instance method 的另一種寫法
// AnimalSchema.methods('getName', function () {
//   console.log(`The animal is ${this.name}`);
// });

// Compile Schema 變成 Model，如此可以透過這個 Model 建立和儲存 document
// 會在 mongo 中建立名為 animals 的 collection
module.exports = mongoose.model('Animal', AnimalSchema);