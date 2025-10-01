const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        message: 'Không tìm thấy token xác thực'
      });
    }

    const token = authHeader.split(' ')[1]; // Bỏ "Bearer " prefix
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Token không hợp lệ'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = {
      id: decoded.userId,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token không hợp lệ'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token đã hết hạn'
      });
    }
    
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi xác thực token'
    });
  }
};

module.exports = { verifyToken };