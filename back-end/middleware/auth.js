const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log('Auth middleware called');
  console.log('Headers:', req.headers);
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Invalid authorization header format');
    return res.status(401).json({
      status: 'error',
      message: 'Invalid authorization header format'
    });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token extracted:', token);

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Token decoded successfully:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    return res.status(403).json({
      status: 'error',
      message: 'Invalid or expired token',
      details: error.message
    });
  }
};

module.exports = { authenticateToken };
