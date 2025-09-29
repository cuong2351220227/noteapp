const mysql = require('mysql2');

// Tạo pool connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Mặc định XAMPP
    password: '', // Mặc định XAMPP không có password
    database: 'dbnotesapp', // Tên database bạn đang dùng
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Chuyển đổi pool để sử dụng Promises thay vì callbacks
const promisePool = pool.promise();

module.exports = promisePool;