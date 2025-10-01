const db = require('./db');

async function testDatabase() {
    try {
        console.log('Testing database connection...');

        // Test SHOW TABLES
        const [tables] = await db.execute('SHOW TABLES');
        console.log('Available tables:', tables);

        // Test users table
        const [users] = await db.execute('SELECT * FROM users LIMIT 1');
        console.log('Users table data:', users);

        // Test specific user
        const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [8]);
        console.log('User with ID 8:', user);

        console.log('Database test completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Database test failed:', error);
        process.exit(1);
    }
}

testDatabase();