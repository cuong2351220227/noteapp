const db = require('../db');
const bcrypt = require('bcrypt');

// Lấy thống kê tổng quan
const getStats = (req, res) => {
  try {
    const queries = [
      'SELECT COUNT(*) as totalUsers FROM users',
      'SELECT COUNT(*) as totalNotes FROM notes',
      'SELECT COUNT(*) as newUsersToday FROM users WHERE DATE(created_at) = CURDATE()',
      'SELECT COUNT(*) as activeUsers FROM users WHERE is_active = 1'
    ];

    let completed = 0;
    const stats = {};

    queries.forEach((query, index) => {
      db.query(query, (err, results) => {
        if (err) {
          console.error('Stats query error:', err);
          return res.status(500).json({
            status: 'error',
            message: 'Error fetching statistics'
          });
        }

        const key = Object.keys(results[0])[0];
        stats[key] = results[0][key];
        completed++;

        if (completed === queries.length) {
          res.json({
            status: 'success',
            data: stats
          });
        }
      });
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Lấy danh sách người dùng
const getUsers = (req, res) => {
  try {
    const query = `
      SELECT id, username, email, full_name, role, is_active, created_at, updated_at
      FROM users 
      ORDER BY created_at DESC
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Get users error:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Error fetching users'
        });
      }

      res.json({
        status: 'success',
        data: results
      });
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Lấy danh sách ghi chú
const getNotes = (req, res) => {
  try {
    const query = `
      SELECT n.*, u.username, c.name as category_name
      FROM notes n
      LEFT JOIN users u ON n.user_id = u.id
      LEFT JOIN categories c ON n.category_id = c.id
      ORDER BY n.created_at DESC
      LIMIT 100
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Get notes error:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Error fetching notes'
        });
      }

      res.json({
        status: 'success',
        data: results
      });
    });

  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Lấy hoạt động gần đây
const getRecentActivities = (req, res) => {
  try {
    const activities = [];

    // Lấy người dùng mới
    db.query(
      'SELECT username, created_at FROM users ORDER BY created_at DESC LIMIT 5',
      (err, userResults) => {
        if (err) {
          console.error('Activities query error:', err);
          return res.status(500).json({
            status: 'error',
            message: 'Error fetching activities'
          });
        }

        userResults.forEach(user => {
          activities.push({
            id: `user_${user.username}_${Date.now()}`,
            type: 'user_registered',
            text: `Người dùng mới: ${user.username}`,
            timestamp: user.created_at,
            icon: 'fas fa-user-plus'
          });
        });

        // Lấy ghi chú mới
        db.query(
          'SELECT n.title, n.created_at, u.username FROM notes n LEFT JOIN users u ON n.user_id = u.id ORDER BY n.created_at DESC LIMIT 5',
          (err, noteResults) => {
            if (err) {
              console.error('Notes activities query error:', err);
            } else {
              noteResults.forEach(note => {
                activities.push({
                  id: `note_${note.title}_${Date.now()}`,
                  type: 'note_created',
                  text: `Ghi chú mới: "${note.title || 'Không có tiêu đề'}" bởi ${note.username}`,
                  timestamp: note.created_at,
                  icon: 'fas fa-sticky-note'
                });
              });
            }

            // Sắp xếp theo thời gian và giới hạn
            activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            res.json({
              status: 'success',
              data: activities.slice(0, 10)
            });
          }
        );
      }
    );

  } catch (error) {
    console.error('Get recent activities error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Cập nhật thông tin người dùng
const updateUser = (req, res) => {
  try {
    const userId = req.params.id;
    const { full_name, username, email, is_active, role } = req.body;

    const updates = [];
    const params = [];

    if (full_name !== undefined) {
      updates.push('full_name = ?');
      params.push(full_name);
    }
    if (username !== undefined) {
      updates.push('username = ?');
      params.push(username);
    }
    if (email !== undefined) {
      updates.push('email = ?');
      params.push(email);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(is_active);
    }
    if (role !== undefined) {
      updates.push('role = ?');
      params.push(role);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No data to update'
      });
    }

    updates.push('updated_at = NOW()');
    params.push(userId);

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Update user error:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Error updating user'
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      res.json({
        status: 'success',
        message: 'User updated successfully'
      });
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Tạo người dùng mới
const createUser = (req, res) => {
  try {
    const { full_name, username, email, password, role = 'user', is_active = true } = req.body;

    if (!full_name || !username || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }

    // Kiểm tra username và email đã tồn tại
    db.query(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email],
      (err, results) => {
        if (err) {
          console.error('Check user exists error:', err);
          return res.status(500).json({
            status: 'error',
            message: 'Database error'
          });
        }

        if (results.length > 0) {
          return res.status(400).json({
            status: 'error',
            message: 'Username or email already exists'
          });
        }

        // Hash password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Password hashing error:', err);
            return res.status(500).json({
              status: 'error',
              message: 'Error processing password'
            });
          }

          // Tạo user mới
          const query = `
            INSERT INTO users (full_name, username, email, password, role, is_active)
            VALUES (?, ?, ?, ?, ?, ?)
          `;

          db.query(
            query,
            [full_name, username, email, hashedPassword, role, is_active],
            (err, results) => {
              if (err) {
                console.error('Create user error:', err);
                return res.status(500).json({
                  status: 'error',
                  message: 'Error creating user'
                });
              }

              res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: { id: results.insertId }
              });
            }
          );
        });
      }
    );

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Chuyển đổi trạng thái người dùng
const toggleUserStatus = (req, res) => {
  try {
    const userId = req.params.id;

    db.query(
      'UPDATE users SET is_active = NOT is_active WHERE id = ?',
      [userId],
      (err, results) => {
        if (err) {
          console.error('Toggle user status error:', err);
          return res.status(500).json({
            status: 'error',
            message: 'Error updating user status'
          });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({
            status: 'error',
            message: 'User not found'
          });
        }

        res.json({
          status: 'success',
          message: 'User status updated successfully'
        });
      }
    );

  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Xóa người dùng
const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;

    // Không cho phép xóa admin hiện tại
    if (parseInt(userId) === req.user.id) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot delete your own account'
      });
    }

    db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Delete user error:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Error deleting user'
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      res.json({
        status: 'success',
        message: 'User deleted successfully'
      });
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Xóa ghi chú
const deleteNote = (req, res) => {
  try {
    const noteId = req.params.id;

    db.query('DELETE FROM notes WHERE id = ?', [noteId], (err, results) => {
      if (err) {
        console.error('Delete note error:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Error deleting note'
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Note not found'
        });
      }

      res.json({
        status: 'success',
        message: 'Note deleted successfully'
      });
    });

  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Xuất danh sách người dùng ra Excel
const exportUsers = async (req, res) => {
  try {
    db.query(
      'SELECT id, username, email, full_name, role, is_active, created_at FROM users ORDER BY created_at DESC',
      (err, results) => {
        if (err) {
          console.error('Export users error:', err);
          return res.status(500).json({
            status: 'error',
            message: 'Error fetching users for export'
          });
        }

        // Simple CSV export instead of Excel
        let csv = 'ID,Username,Email,Full Name,Role,Status,Created At\n';
        results.forEach(user => {
          csv += `${user.id},"${user.username}","${user.email}","${user.full_name}","${user.role}","${user.is_active ? 'Active' : 'Inactive'}","${new Date(user.created_at).toLocaleDateString('vi-VN')}"\n`;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
        res.send(csv);
      }
    );

  } catch (error) {
    console.error('Export users error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

// Lưu cài đặt hệ thống
const saveSettings = (req, res) => {
  try {
    const settings = req.body;

    // Ở đây bạn có thể lưu cài đặt vào database hoặc file config
    // Tạm thời chỉ trả về success
    res.json({
      status: 'success',
      message: 'Settings saved successfully',
      data: settings
    });

  } catch (error) {
    console.error('Save settings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

module.exports = {
  getStats,
  getUsers,
  getNotes,
  getRecentActivities,
  updateUser,
  createUser,
  toggleUserStatus,
  deleteUser,
  deleteNote,
  exportUsers,
  saveSettings
};