const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const checkAdminRole = require('../middleware/adminMiddleware');

// Get dashboard statistics
router.get('/stats', checkAdminRole, async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM notes) as total_notes,
        (SELECT COUNT(*) FROM users WHERE last_login > NOW() - INTERVAL '24 hours') as active_users
    `);

    res.json({
      status: 'success',
      data: stats.rows[0]
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy thống kê'
    });
  }
});

// Get recent activities
router.get('/activities', checkAdminRole, async (req, res) => {
  try {
    const activities = await pool.query(`
      SELECT 
        a.*,
        u.username,
        u.full_name
      FROM activities a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `);

    res.json({
      status: 'success',
      data: activities.rows
    });
  } catch (error) {
    console.error('Error getting activities:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy hoạt động gần đây'
    });
  }
});

// Get all users with pagination
router.get('/users', checkAdminRole, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const users = await pool.query(`
      SELECT 
        id, username, email, full_name, role, created_at,
        last_login, profile_image
      FROM users
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    const total = await pool.query('SELECT COUNT(*) FROM users');

    res.json({
      status: 'success',
      data: {
        users: users.rows,
        total: parseInt(total.rows[0].count),
        page: parseInt(page),
        totalPages: Math.ceil(total.rows[0].count / limit)
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách người dùng'
    });
  }
});

// Update user role
router.put('/users/:id/role', checkAdminRole, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const result = await pool.query(`
      UPDATE users 
      SET role = $1
      WHERE id = $2
      RETURNING id, username, email, role
    `, [role, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy người dùng'
      });
    }

    res.json({
      status: 'success',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi cập nhật quyền người dùng'
    });
  }
});

module.exports = router;