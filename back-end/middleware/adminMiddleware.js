const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const checkAdminRole = async (req, res, next) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Không tìm thấy token xác thực' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Kiểm tra user trong database
    const result = await pool.query(
      'SELECT role FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy người dùng'
      });
    }

    // Kiểm tra role
    if (result.rows[0].role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Không có quyền truy cập'
      });
    }

    // Lưu thông tin user vào request
    req.user = {
      ...decoded,
      role: result.rows[0].role
    };

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(401).json({
      status: 'error',
      message: 'Token không hợp lệ'
    });
  }
};

module.exports = checkAdminRole;