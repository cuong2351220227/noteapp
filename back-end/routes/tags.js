const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../db');

// Lấy tất cả tags của user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [tags] = await db.query(
            `SELECT t.*, COUNT(DISTINCT n.id) as note_count 
            FROM tags t 
            LEFT JOIN note_tags nt ON t.id = nt.tag_id 
            LEFT JOIN notes n ON nt.note_id = n.id AND n.user_id = ?
            WHERE t.user_id = ?
            GROUP BY t.id`, 
            [req.user.id, req.user.id]
        );
        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Tạo tag mới
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name } = req.body;
        
        // Tạo tag mới
        const [result] = await db.query(
            'INSERT INTO tags (name, user_id) VALUES (?, ?)',
            [name, req.user.id]
        );

        // Lấy lại danh sách tags đã cập nhật
        const [tags] = await db.query(
            `SELECT t.*, COUNT(DISTINCT n.id) as note_count 
            FROM tags t 
            LEFT JOIN note_tags nt ON t.id = nt.tag_id 
            LEFT JOIN notes n ON nt.note_id = n.id AND n.user_id = ?
            WHERE t.user_id = ?
            GROUP BY t.id`, 
            [req.user.id, req.user.id]
        );
        
        res.status(201).json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Lấy tất cả ghi chú có tag
router.get('/:id/notes', authenticateToken, async (req, res) => {
    try {
        const [notes] = await db.query(
            `SELECT n.*, 
                GROUP_CONCAT(DISTINCT c.name) as categories,
                GROUP_CONCAT(DISTINCT t2.name) as tags
            FROM notes n
            INNER JOIN note_tags nt ON n.id = nt.note_id
            INNER JOIN tags t ON nt.tag_id = t.id
            LEFT JOIN note_categories nc ON n.id = nc.note_id
            LEFT JOIN categories c ON nc.category_id = c.id
            LEFT JOIN note_tags nt2 ON n.id = nt2.note_id
            LEFT JOIN tags t2 ON nt2.tag_id = t2.id
            WHERE t.id = ? AND n.user_id = ?
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