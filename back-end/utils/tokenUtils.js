const jwt = require('jsonwebtoken');

// Function để kiểm tra token
const checkToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        return decoded;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
};

// Function để tạo token mới với role
const generateToken = (userId, username, role) => {
    try {
        const token = jwt.sign(
            { userId, username, role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        console.log('Generated token for:', { userId, username, role });
        return token;
    } catch (error) {
        console.error('Token generation error:', error);
        return null;
    }
};

module.exports = {
    checkToken,
    generateToken
};