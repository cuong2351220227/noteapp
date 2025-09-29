const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const authMiddleware = async (req, res, next) => {
    try {
        console.log('Auth Headers:', req.headers);
        
        // Lấy token từ header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('Missing or invalid Authorization header');
            return res.status(401).json({
                status: 'error',
                message: 'Token không hợp lệ hoặc không tồn tại'
            });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token received:', token);
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        
        // Kiểm tra user trong database
        const [rows] = await pool.query(
            'SELECT id, username, email, role FROM users WHERE id = ?', 
            [decoded.userId]
        );
        console.log('User found:', rows[0]);
        
        if (rows.length === 0) {
            console.log('User not found in database');
            return res.status(401).json({
                status: 'error',
                message: 'Người dùng không tồn tại'
            });
        }

        // Thêm thông tin user vào request
        req.user = {
            ...rows[0],
            userId: decoded.userId
        };
        console.log('Request user set:', req.user);

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            status: 'error',
            message: 'Token không hợp lệ'
        });
    }
};

module.exports = authMiddleware;