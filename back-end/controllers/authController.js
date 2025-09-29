const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Login function
const login = async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Username và password là bắt buộc'
      });
    }

    // Check user in database
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
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
          message: 'Username hoặc password không đúng'
        });
      }

      const user = results[0];

      // Compare password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({
          status: 'error',
          message: 'Username hoặc password không đúng'
        });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        status: 'success',
        data: {
          user: userWithoutPassword,
          token
        }
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Đã xảy ra lỗi khi đăng nhập'
    });
  }
};

// Register new user
const register = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { fullName, email, username, password } = req.body;

    // Basic validation
    if (!fullName || !email || !username || !password) {
      return res.status(400).json({ 
        status: 'error',
        message: 'All fields are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email format'
      });
    }

    // Password length validation
    if (password.length < 8) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 8 characters long'
      });
    }

    // Check for existing email
    db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error'
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Email is already registered'
        });
      }

      // Check for existing username
      db.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
          });
        }

        if (results.length > 0) {
          return res.status(400).json({
            status: 'error',
            message: 'Username is already taken'
          });
        }

        // Hash password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Password hashing error:', err);
            return res.status(500).json({
              status: 'error',
              message: 'Internal server error'
            });
          }

          // Insert new user
          const query = 'INSERT INTO users (full_name, email, username, password) VALUES (?, ?, ?, ?)';
          db.query(query, [fullName, email, username, hashedPassword], (err, result) => {
            if (err) {
              console.error('Error registering user:', err);
              return res.status(500).json({
                status: 'error',
                message: 'Error registering user'
              });
            }

            res.status(201).json({
              status: 'success',
              message: 'Registration successful',
              userId: result.insertId
            });
          });
        });
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    console.log('Update profile request:', req.body);
    console.log('User from token:', req.user);
    
    const { email, displayName } = req.body;
    const userId = req.user.id;

    // Basic validation
    if (!email && !displayName) {
      return res.status(400).json({
        status: 'error',
        message: 'Cần ít nhất một trường để cập nhật'
      });
    }

    // Email format validation if email is provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          status: 'error',
          message: 'Định dạng email không hợp lệ'
        });
      }
    }

    // Build update query
    let query = 'UPDATE users SET ';
    let params = [];
    let updates = [];

    if (email) {
      updates.push('email = ?');
      params.push(email);
    }

    if (displayName) {
      updates.push('full_name = ?');
      params.push(displayName);
    }

    query += updates.join(', ') + ' WHERE id = ?';
    params.push(userId);

    console.log('Update query:', query);
    console.log('Update params:', params);

    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Database update error:', err);
        return res.status(500).json({
          status: 'error',
          message: 'Lỗi cập nhật cơ sở dữ liệu'
        });
      }

      console.log('Update result:', result);

      // Get updated user data
      db.query('SELECT id, username, email, full_name FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
          console.error('Database select error:', err);
          return res.status(500).json({
            status: 'error',
            message: 'Lỗi truy vấn cơ sở dữ liệu'
          });
        }

        if (results.length === 0) {
          return res.status(404).json({
            status: 'error',
            message: 'Không tìm thấy người dùng'
          });
        }

        const updatedUser = results[0];
        console.log('Updated user:', updatedUser);
        
        res.json({
          status: 'success',
          message: 'Cập nhật thông tin thành công',
          data: {
            user: updatedUser
          }
        });
      });
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server nội bộ'
    });
  }
};

module.exports = {
  register,
  login,
  updateProfile
};
