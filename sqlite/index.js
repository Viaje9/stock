const express = require("express");
const router = require("./router/index");
const app = express();


app.use('/api', router);

app.listen(3000);
console.log('Express started on port 3000');