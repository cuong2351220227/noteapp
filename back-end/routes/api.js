const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Profile routes (cần authentication)
router.put('/profile', authenticateToken, authController.updateProfile);
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;