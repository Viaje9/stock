const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/stock', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 取得資料庫連線狀態
const db = mongoose.connection;
db.on('error', (err) => console.error('失敗', err)); // 連線異常
db.once('open', (db) => console.log('成功')); // 連線成功




