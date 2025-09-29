const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const db = require('../db');

// Cấu hình multer cho việc upload ảnh
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

// Đăng ký người dùng
router.post('/register', upload.single('profile_image'), async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;
        
        // Kiểm tra email đã tồn tại
        const [users] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        
        if (users.length > 0) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Đường dẫn ảnh đại diện (nếu có)
        const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

        // Tạo user mới
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password, profile_image, full_name) VALUES (?, ?, ?, ?, ?)',
            [username, email, hashedPassword, profileImage, fullName]
        );

        res.status(201).json({ 
            status: 'success',
            message: 'Đăng ký thành công',
            userId: result.insertId,
            profileImage: profileImage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Tìm user theo username với đầy đủ thông tin bao gồm password để check
        const [users] = await db.execute(
            'SELECT id, username, email, password, role, profile_image FROM users WHERE username = ?',
            [username]
        );
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }

        const user = users[0];

        // Kiểm tra password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Tạo JWT token với thông tin role
        const token = jwt.sign(
            { 
                userId: user.id,
                role: user.role 
            },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                profileImage: user.profile_image
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;