const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../db');

// Lấy tất cả danh mục của user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [categories] = await db.query(
            `SELECT c.*, COUNT(DISTINCT n.id) as note_count 
            FROM categories c 
            LEFT JOIN note_categories nc ON c.id = nc.category_id 
            LEFT JOIN notes n ON nc.note_id = n.id AND n.user_id = ?
            WHERE c.user_id = ?
            GROUP BY c.id`, 
            [req.user.id, req.user.id]
        );
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Tạo danh mục mới
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name } = req.body;
        
        // Tạo danh mục mới
        const [result] = await db.query(
            'INSERT INTO categories (name, user_id) VALUES (?, ?)',
            [name, req.user.id]
        );

        // Lấy lại danh sách danh mục đã cập nhật
        const [categories] = await db.query(
            `SELECT c.*, COUNT(DISTINCT n.id) as note_count 
            FROM categories c 
            LEFT JOIN note_categories nc ON c.id = nc.category_id 
            LEFT JOIN notes n ON nc.note_id = n.id AND n.user_id = ?
            WHERE c.user_id = ?
            GROUP BY c.id`, 
            [req.user.id, req.user.id]
        );
        
        res.status(201).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Lấy tất cả ghi chú trong một danh mục
router.get('/:id/notes', authenticateToken, async (req, res) => {
    try {
        const [notes] = await db.query(
            `SELECT n.*, 
                GROUP_CONCAT(DISTINCT c2.name) as categories,
                GROUP_CONCAT(DISTINCT t.name) as tags
            FROM notes n
            INNER JOIN note_categories nc ON n.id = nc.note_id
            INNER JOIN categories c ON nc.category_id = c.id
            LEFT JOIN note_categories nc2 ON n.id = nc2.note_id
            LEFT JOIN categories c2 ON nc2.category_id = c2.id
            LEFT JOIN note_tags nt ON n.id = nt.note_id
            LEFT JOIN tags t ON nt.tag_id = t.id
            WHERE c.id = ? AND n.user_id = ?
            GROUP BY n.id`,
            [req.params.id, req.user.id]
        );

        const formattedNotes = notes.map(note => ({
            ...note,
            categories: note.categories ? note.categories.split(',') : [],
            tags: note.tags ? note.tags.split(',') : []
        }));

        res.json(formattedNotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;