import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        currentUser: (state) => state.user
    },

    actions: {
        async login(credentials) {
            try {
                const data = await api.auth.login(credentials);
                this.user = data.user;
                this.token = data.token;
                return data;
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },

        async register(userData) {
            try {
                const data = await api.auth.register(userData);
                return data;
            } catch (error) {
                console.error('Register error:', error);
                throw error;
            }
        },

        logout() {
            api.auth.logout();
            this.user = null;
            this.token = null;
        }
    }
});