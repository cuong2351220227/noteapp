const pool = require('./config/db');

async function checkAdminAccount() {
    try {
        // Kiểm tra tài khoản admin
        const [rows] = await pool.query('SELECT * FROM users WHERE role = ?', ['admin']);
        
        console.log('Số lượng tài khoản admin:', rows.length);
        if (rows.length > 0) {
            console.log('Danh sách tài khoản admin:');
            rows.forEach(user => {
                console.log(`- Username: ${user.username}`);
                console.log(`  Role: ${user.role}`);
                console.log(`  Email: ${user.email}`);
                console.log('------------------------');
            });
        } else {
            console.log('Chưa có tài khoản admin nào!');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Lỗi kiểm tra admin:', error);
        process.exit(1);
    }
}

checkAdminAccount();