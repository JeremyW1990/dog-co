const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'dog-co',
    password: 'root'
});

module.exports = pool.promise();