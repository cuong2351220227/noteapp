const mysql = require('mysql2');

// Tạo connection pool thay vì single connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbnotesapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kiểm tra kết nối
pool.getConnection((err, conn) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to the database.');
    conn.release();
});

// Xuất pool promise để sử dụng async/await
module.exports = pool.promise();
