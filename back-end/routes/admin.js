const express = require('express');
const router = express.Router();
const { adminMiddleware } = require('../middleware/adminMiddleware');
const adminController = require('../controllers/adminController');

// Áp dụng middleware admin cho tất cả routes
router.use(adminMiddleware);

// Dashboard statistics
router.get('/stats', adminController.getStats);


// User management
router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.put('/users/:id/toggle-status', adminController.toggleUserStatus);
router.delete('/users/:id', adminController.deleteUser);
router.get('/users/export', adminController.exportUsers);

// Note management
router.get('/notes', adminController.getNotes);
router.delete('/notes/:id', adminController.deleteNote);

// Activities
router.get('/activities', adminController.getRecentActivities);

// System settings
router.put('/settings', adminController.saveSettings);

module.exports = router;