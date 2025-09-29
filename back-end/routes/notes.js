const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const db = require('../db');

// Lấy tất cả ghi chú của user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [notes] = await db.query(
            `SELECT n.*, 
                GROUP_CONCAT(DISTINCT c.name) as categories,
                GROUP_CONCAT(DISTINCT t.name) as tags
            FROM notes n
            LEFT JOIN note_categories nc ON n.id = nc.note_id
            LEFT JOIN categories c ON nc.category_id = c.id
            LEFT JOIN note_tags nt ON n.id = nt.note_id
            LEFT JOIN tags t ON nt.tag_id = t.id
            WHERE n.user_id = ?
            GROUP BY n.id`, 
            [req.user.userId]
        );
        
        // Format lại dữ liệu
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

// Tạo ghi chú mới
router.post('/', authenticateToken, async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const { title, content, is_pinned = false, categories = [], tags = [] } = req.body;
        
        // Tạo ghi chú
        const [result] = await connection.query(
            'INSERT INTO notes (user_id, title, content, is_pinned) VALUES (?, ?, ?, ?)',
            [req.user.userId, title, content, is_pinned]
        );
        const noteId = result.insertId;

        // Thêm categories
        if (categories.length > 0) {
            const categoryValues = categories.map(categoryId => [noteId, categoryId]);
            await connection.query(
                'INSERT INTO note_categories (note_id, category_id) VALUES ?',
                [categoryValues]
            );
        }

        // Thêm tags
        if (tags.length > 0) {
            const tagValues = tags.map(tagId => [noteId, tagId]);
            await connection.query(
                'INSERT INTO note_tags (note_id, tag_id) VALUES ?',
                [tagValues]
            );
        }

        await connection.commit();

        // Lấy ghi chú vừa tạo với đầy đủ thông tin
        const [notes] = await connection.query(
            `SELECT n.*, 
                GROUP_CONCAT(DISTINCT c.name) as categories,
                GROUP_CONCAT(DISTINCT t.name) as tags
            FROM notes n
            LEFT JOIN note_categories nc ON n.id = nc.note_id
            LEFT JOIN categories c ON nc.category_id = c.id
            LEFT JOIN note_tags nt ON n.id = nt.note_id
            LEFT JOIN tags t ON nt.tag_id = t.id
            WHERE n.id = ? AND n.user_id = ?
            GROUP BY n.id`,
            [noteId, req.user.id]
        );

        const note = notes[0] ? {
            ...notes[0],
            categories: notes[0].categories ? notes[0].categories.split(',') : [],
            tags: notes[0].tags ? notes[0].tags.split(',') : []
        } : null;

        res.status(201).json(note);
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    } finally {
        connection.release();
    }
});

// Cập nhật ghi chú
router.put('/:id', authenticateToken, async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const { title, content, is_pinned, categories = [], tags = [] } = req.body;
        const noteId = parseInt(req.params.id);

        // Kiểm tra quyền sở hữu ghi chú
        const [notes] = await connection.query(
            'SELECT id FROM notes WHERE id = ? AND user_id = ?',
            [noteId, req.user.id]
        );

        if (notes.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Không tìm thấy ghi chú' });
        }

        // Cập nhật ghi chú
        await connection.query(
            'UPDATE notes SET title = ?, content = ?, is_pinned = ? WHERE id = ? AND user_id = ?',
            [title, content, is_pinned, noteId, req.user.id]
        );

        // Cập nhật categories
        await connection.query('DELETE FROM note_categories WHERE note_id = ?', [noteId]);
        if (categories.length > 0) {
            const categoryValues = categories.map(categoryId => [noteId, categoryId]);
            await connection.query(
                'INSERT INTO note_categories (note_id, category_id) VALUES ?',
                [categoryValues]
            );
        }

        // Cập nhật tags
        await connection.query('DELETE FROM note_tags WHERE note_id = ?', [noteId]);
        if (tags.length > 0) {
            const tagValues = tags.map(tagId => [noteId, tagId]);
            await connection.query(
                'INSERT INTO note_tags (note_id, tag_id) VALUES ?',
                [tagValues]
            );
        }

        await connection.commit();

        // Lấy ghi chú đã cập nhật
        const [updatedNotes] = await connection.query(
            `SELECT n.*, 
                GROUP_CONCAT(DISTINCT c.name) as categories,
                GROUP_CONCAT(DISTINCT t.name) as tags
            FROM notes n
            LEFT JOIN note_categories nc ON n.id = nc.note_id
            LEFT JOIN categories c ON nc.category_id = c.id
            LEFT JOIN note_tags nt ON n.id = nt.note_id
            LEFT JOIN tags t ON nt.tag_id = t.id
            WHERE n.id = ? AND n.user_id = ?
            GROUP BY n.id`,
            [noteId, req.user.id]
        );

        const note = updatedNotes[0] ? {
            ...updatedNotes[0],
            categories: updatedNotes[0].categories ? updatedNotes[0].categories.split(',') : [],
            tags: updatedNotes[0].tags ? updatedNotes[0].tags.split(',') : []
        } : null;

        res.json(note);
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    } finally {
        connection.release();
    }
});

// Xóa ghi chú
router.delete('/:id', authenticateToken, async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const noteId = parseInt(req.params.id);

        // Kiểm tra quyền sở hữu ghi chú
        const [notes] = await connection.query(
            'SELECT id FROM notes WHERE id = ? AND user_id = ?',
            [noteId, req.user.id]
        );

        if (notes.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Không tìm thấy ghi chú' });
        }

        // Xóa các liên kết với categories và tags
        await connection.query('DELETE FROM note_categories WHERE note_id = ?', [noteId]);
        await connection.query('DELETE FROM note_tags WHERE note_id = ?', [noteId]);
        
        // Xóa ghi chú
        await connection.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [noteId, req.user.id]);

        await connection.commit();
        res.json({ message: 'Đã xóa ghi chú thành công' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    } finally {
        connection.release();
    }
});

module.exports = router;