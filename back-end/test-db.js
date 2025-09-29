const db = require('./db');

// Test the database connection
console.log('Testing database connection...');

// Try to query the users table
db.query('SHOW TABLES', (error, results) => {
    if (error) {
        console.error('Error querying database:', error);
        process.exit(1);
    }
    
    console.log('Available tables:', results);
    
    // Test users table
    db.query('SELECT * FROM users LIMIT 1', (error, users) => {
        if (error) {
            console.error('Error querying users table:', error);
        } else {
            console.log('Users table accessible, sample data:', users);
        }
        
        // Close the connection
        db.end((err) => {
            if (err) {
                console.error('Error closing connection:', err);
                process.exit(1);
            }
            console.log('Database connection test completed.');
            process.exit(0);
        });
    });
});