const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '127.0.0.1',//数据库地址
    user: 'root',//账号
    password: '',//密码
    database: 'pinduoduo_bt',//库名
    multipleStatements: true //允许执行多条语句
});
conn.connect();
module.exports = conn;