import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Thêm withCredentials
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor để gửi token trong header
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor để xử lý lỗi
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Xóa token và user nếu unauthorized/forbidden
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authService = {
    async login(credentials) {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async register(userData) {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export const noteService = {
    async getAllNotes() {
        try {
            const response = await api.get('/notes');
            return response.data;
        } catch (error) {
            console.error('Get notes error:', error);
            throw error;
        }
    },

    async createNote(noteData) {
        try {
            const response = await api.post('/notes', noteData);
            return response.data;
        } catch (error) {
            console.error('Create note error:', error);
            throw error;
        }
    },

    async updateNote(id, noteData) {
        try {
            const response = await api.put(`/notes/${id}`, noteData);
            return response.data;
        } catch (error) {
            console.error('Update note error:', error);
            throw error;
        }
    },

    async deleteNote(id) {
        try {
            const response = await api.delete(`/notes/${id}`);
            return response.data;
        } catch (error) {
            console.error('Delete note error:', error);
            throw error;
        }
    }
};

export const categoryService = {
    async getAllCategories() {
        try {
            const response = await api.get('/categories');
            return response.data;
        } catch (error) {
            console.error('Get categories error:', error);
            throw error;
        }
    }
};

export const tagService = {
    async getAllTags() {
        try {
            const response = await api.get('/tags');
            return response.data;
        } catch (error) {
            console.error('Get tags error:', error);
            throw error;
        }
    }
};

export default api;