import { defineStore } from 'pinia';
import api from '@/services/api';

export const useNoteStore = defineStore('notes', {
    state: () => ({
        notes: [],
        categories: [],
        tags: [],
        loading: false,
        error: null
    }),

    getters: {
        pinnedNotes: (state) => state.notes.filter(note => note.is_pinned),
        unpinnedNotes: (state) => state.notes.filter(note => !note.is_pinned),
        getNotesByCategory: (state) => (categoryId) => {
            return state.notes.filter(note => 
                note.categories?.some(cat => cat.id === categoryId)
            );
        },
        getNotesByTag: (state) => (tagId) => {
            return state.notes.filter(note => 
                note.tags?.some(tag => tag.id === tagId)
            );
        }
    },

    actions: {
        async fetchNotes() {
            this.loading = true;
            try {
                const notes = await api.notes.getAllNotes();
                this.notes = notes;
            } catch (error) {
                this.error = error.message;
                console.error('Fetch notes error:', error);
            } finally {
                this.loading = false;
            }
        },

        async createNote(noteData) {
            try {
                const note = await api.notes.createNote(noteData);
                this.notes.unshift(note);
                return note;
            } catch (error) {
                console.error('Create note error:', error);
                throw error;
            }
        },

        async updateNote(id, noteData) {
            try {
                const updatedNote = await api.notes.updateNote(id, noteData);
                const index = this.notes.findIndex(note => note.id === id);
                if (index !== -1) {
                    this.notes[index] = updatedNote;
                }
                return updatedNote;
            } catch (error) {
                console.error('Update note error:', error);
                throw error;
            }
        },

        async deleteNote(id) {
            try {
                await api.notes.deleteNote(id);
                this.notes = this.notes.filter(note => note.id !== id);
            } catch (error) {
                console.error('Delete note error:', error);
                throw error;
            }
        },

        // Categories
        async fetchCategories() {
            try {
                const categories = await api.categories.getAllCategories();
                this.categories = categories;
            } catch (error) {
                console.error('Fetch categories error:', error);
                throw error;
            }
        },

        async createCategory(name) {
            try {
                const categories = await api.categories.createCategory(name);
                this.categories = categories;
                return categories;
            } catch (error) {
                console.error('Create category error:', error);
                throw error;
            }
        },

        // Tags
        async fetchTags() {
            try {
                const tags = await api.tags.getAllTags();
                this.tags = tags;
            } catch (error) {
                console.error('Fetch tags error:', error);
                throw error;
            }
        },

        async createTag(name) {
            try {
                const tags = await api.tags.createTag(name);
                this.tags = tags;
                return tags;
            } catch (error) {
                console.error('Create tag error:', error);
                throw error;
            }
        }
    }
});