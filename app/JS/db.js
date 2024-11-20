const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "capstone"
});

db.connect((err) => {
    if(err) {
        console.error('MySQL 연결 실패 : ', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

module.exports = db;