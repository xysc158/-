const mysql = require('mysql');
// import mysql from 'mysql';
const  conn = mysql.createConnection({
    host: 'localhost', // 数据库的地址
    user: 'root', // 账号
    password: '4323', // 密码
    database: 'xxc_pdd', // 数据库名称
});
conn.connect();
module.exports = conn;