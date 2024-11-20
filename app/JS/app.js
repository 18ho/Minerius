const express = require('express');
const app = express();
const routes = require("./route.js");

app.use(express.json());
app.use('/api',routes);

app.listen(3000, () => {
    console.log('서버가 3000포트에서 실행중입니다.');
});