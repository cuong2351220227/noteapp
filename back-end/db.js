const mysql = require('mysql2');
const config = require('./config/db.config');

// Tạo connection pool
const pool = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kiểm tra kết nối và structure
const initDb = async () => {
    try {
        const connection = await pool.promise().getConnection();
        console.log('Successfully connected to the database.');

        // Kiểm tra bảng users
        const [tables] = await connection.query('SHOW TABLES LIKE "users"');
        if (tables.length === 0) {
            throw new Error('Users table does not exist');
        }

        // Kiểm tra cấu trúc bảng
        const [columns] = await connection.query('SHOW COLUMNS FROM users');
        const requiredColumns = ['id', 'username', 'email', 'full_name', 'profile_image', 'created_at'];
        const missingColumns = requiredColumns.filter(
            col => !columns.some(c => c.Field === col)
        );

        if (missingColumns.length > 0) {
            throw new Error(`Missing columns in users table: ${missingColumns.join(', ')}`);
        }

        connection.release();
        return true;
    } catch (err) {
        console.error('Database initialization error:', err);
        throw err;
    }
};

// Thực hiện kiểm tra khi khởi động
initDb().catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});

// Xuất pool promise để sử dụng async/await
const promisePool = pool.promise();

// Thêm wrapper để log queries
const execute = async (...args) => {
    console.log('Executing SQL:', args[0], 'with params:', args[1] || []);
    try {
        const result = await promisePool.execute(...args);
        console.log('SQL Result:', result[0]);
        return result;
    } catch (err) {
        console.error('SQL Error:', err);
        throw err;
    }
};

module.exports = {
    ...promisePool,
    execute
};
