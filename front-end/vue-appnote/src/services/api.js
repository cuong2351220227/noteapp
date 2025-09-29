import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
    baseURL: API_URL
});

// Thêm interceptor để tự động gửi token trong header
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    async register(userData) {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async login(credentials) {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export const noteService = {
    async getAllNotes() {
        const response = await api.get('/notes');
        return response.data;
    },

    async createNote(noteData) {
        const response = await api.post('/notes', noteData);
        return response.data;
    },

    async updateNote(id, noteData) {
        const response = await api.put(`/notes/${id}`, noteData);
        return response.data;
    },

    async deleteNote(id) {
        const response = await api.delete(`/notes/${id}`);
        return response.data;
    }
};

export const categoryService = {
    async getAllCategories() {
        const response = await api.get('/categories');
        return response.data;
    },

    async createCategory(name) {
        const response = await api.post('/categories', { name });
        return response.data;
    },

    async getNotesInCategory(categoryId) {
        const response = await api.get(`/categories/${categoryId}/notes`);
        return response.data;
    }
};

export const tagService = {
    async getAllTags() {
        const response = await api.get('/tags');
        return response.data;
    },

    async createTag(name) {
        const response = await api.post('/tags', { name });
        return response.data;
    },

    async getNotesWithTag(tagId) {
        const response = await api.get(`/tags/${tagId}/notes`);
        return response.data;
    }
};

export default {
    auth: authService,
    notes: noteService,
    categories: categoryService,
    tags: tagService
};