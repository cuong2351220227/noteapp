const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173', // Port của frontend
    credentials: true, // Cho phép credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = cors(corsOptions);