const jwt = require('jsonwebtoken');
const db = require('../db');

const adminMiddleware = (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Access token is required'
      });
    }

    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Lấy thông tin user từ database
    db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found'
        });
      }

      const user = results[0];

      // Kiểm tra quyền admin
      if (user.role !== 'admin') {
        return res.status(403).json({
          status: 'error',
          message: 'Admin access required'
        });
      }

      // Kiểm tra user có bị khóa không
      if (!user.is_active) {
        return res.status(403).json({
          status: 'error',
          message: 'Account is disabled'
        });
      }

      // Thêm user info vào request
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      };

      next();
    });

  } catch (error) {
    console.error('Admin middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

const checkAdminRole = adminMiddleware; // For backward compatibility

module.exports = { adminMiddleware, checkAdminRole };