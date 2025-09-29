const express = require("express");
const cors = require("cors");
const db = require('./db');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const categoriesRoutes = require('./routes/categories');
const tagsRoutes = require('./routes/tags');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/tags', tagsRoutes);

// Route cập nhật profile
app.put("/api/profile", async (req, res) => {
  try {
    const { userId, email, full_name } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'Thiếu userId'
      });
    }

    if (!email && !full_name) {
      return res.status(400).json({
        status: 'error',
        message: 'Không có dữ liệu để cập nhật'
      });
    }

    const updates = [];
    const params = [];

    if (email) {
      updates.push('email = ?');
      params.push(email);
    }
    if (full_name) {
      updates.push('full_name = ?');
      params.push(full_name);
    }

    // Thêm userId vào cuối mảng params
    params.push(userId);
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

    const [result] = await db.promise().execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Fetch updated user data
    const [users] = await db.promise().execute(
      'SELECT id, username, email, full_name, profile_image, created_at FROM users WHERE id = ?',
      [userId]
    );

    res.json({
      status: 'success',
      message: 'Cập nhật thông tin thành công',
      data: {
        user: users[0]
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Đã xảy ra lỗi khi cập nhật thông tin'
    });
  }
});

// Route lấy thông tin profile
app.get("/api/profile", async (req, res) => {
  try {
    const { userId } = req.query;
    
    const [users] = await db.promise().execute(
      'SELECT id, username, email, full_name, profile_image, created_at FROM users WHERE id = ?',
      [userId]
    );
    
    if (users.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        user: users[0]
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Đã xảy ra lỗi khi lấy thông tin người dùng'
    });
  }
});

// Route cập nhật ảnh đại diện
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // giới hạn 10MB
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Chỉ chấp nhận file ảnh jpg, jpeg hoặc png!'));
    }
    cb(null, true);
  }
});

app.post("/api/profile/image", upload.single('profile_image'), async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Không tìm thấy file ảnh'
      });
    }

    const profileImage = `/uploads/${req.file.filename}`;

    // Cập nhật đường dẫn ảnh trong database
    const [result] = await db.promise().execute(
      'UPDATE users SET profile_image = ? WHERE id = ?',
      [profileImage, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy người dùng'
      });
    }

    res.json({
      status: 'success',
      message: 'Cập nhật ảnh đại diện thành công',
      data: {
        profile_image: profileImage
      }
    });

  } catch (error) {
    console.error('Update profile image error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Đã xảy ra lỗi khi cập nhật ảnh đại diện'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Đã xảy ra lỗi server'
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});