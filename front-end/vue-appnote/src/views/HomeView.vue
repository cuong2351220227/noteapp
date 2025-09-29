<template>
  <div class="home">
    <div class="controls mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <h1 class="text-h4">Ghi chú của tôi</h1>
        <v-btn color="primary" @click="openCreateNoteDialog">
          <v-icon start>mdi-plus</v-icon>
          Tạo ghi chú mới
        </v-btn>
      </div>

      <div class="my-4">
        <div class="d-flex align-center mb-2">
          <v-icon class="me-2">mdi-format-list-bulleted</v-icon>
          <span class="text-subtitle-1">Danh mục</span>
        </div>
        <v-chip-group v-model="selectedCategory" class="mb-2">
          <v-chip
            :value="null"
            :class="{ 'v-chip--selected': selectedCategory === null }"
          >
            Tất cả
          </v-chip>
          <v-chip 
            v-for="category in categories" 
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </v-chip>
          <v-btn
            variant="text"
            size="small"
            @click="openCategoryDialog"
          >
            <v-icon>mdi-plus</v-icon>
            Thêm danh mục
          </v-btn>
        </v-chip-group>
      </div>

      <div class="mb-4">
        <div class="d-flex align-center mb-2">
          <v-icon class="me-2">mdi-tag-multiple</v-icon>
          <span class="text-subtitle-1">Nhãn</span>
        </div>
        <v-chip-group v-model="selectedTags" multiple class="mb-2">
          <v-chip 
            v-for="tag in tags" 
            :key="tag.id"
            :value="tag.id"
          >
            {{ tag.name }}
          </v-chip>
          <v-btn
            variant="text"
            size="small"
            @click="openTagDialog"
          >
            <v-icon>mdi-plus</v-icon>
            Thêm nhãn
          </v-btn>
        </v-chip-group>
      </div>
    </div>

    <!-- Danh sách ghi chú ghim -->
    <template v-if="pinnedNotes.length > 0">
      <div class="d-flex align-center mb-3">
        <v-icon class="me-2">mdi-pin</v-icon>
        <span class="text-h6">Đã ghim</span>
      </div>
      <v-row>
        <v-col 
          v-for="note in pinnedNotes" 
          :key="note.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <note-card 
            :note="note"
            @edit="openEditNoteDialog"
            @delete="deleteNote"
            @toggle-pin="togglePinNote"
          />
        </v-col>
      </v-row>
    </template>

    <!-- Danh sách ghi chú không ghim -->
    <template v-if="unpinnedNotes.length > 0">
      <div class="d-flex align-center mb-3" v-if="pinnedNotes.length > 0">
        <v-icon class="me-2">mdi-note-text-outline</v-icon>
        <span class="text-h6">Khác</span>
      </div>
      <v-row>
        <v-col 
          v-for="note in unpinnedNotes" 
          :key="note.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <note-card 
            :note="note"
            @edit="openEditNoteDialog"
            @delete="deleteNote"
            @toggle-pin="togglePinNote"
          />
        </v-col>
      </v-row>
    </template>

    <div v-if="!loading && notes.length === 0" class="empty-state text-center py-8">
      <v-icon size="64" color="grey">mdi-note-outline</v-icon>
      <h3 class="text-h6 mt-4 mb-2">Chưa có ghi chú nào</h3>
      <p class="text-body-1 text-grey">Hãy bắt đầu bằng việc tạo ghi chú đầu tiên của bạn</p>
      <v-btn
        color="primary"
        class="mt-4"
        @click="openCreateNoteDialog"
      >
        <v-icon start>mdi-plus</v-icon>
        Tạo ghi chú mới
      </v-btn>
    </div>

    <!-- Dialog tạo/sửa ghi chú -->
    <v-dialog v-model="noteDialog.show" max-width="600px">
      <v-card>
        <v-card-title>
          {{ noteDialog.isEdit ? 'Sửa ghi chú' : 'Tạo ghi chú mới' }}
        </v-card-title>
        
        <v-card-text>
          <v-form @submit.prevent="saveNote">
            <v-text-field
              v-model="noteDialog.note.title"
              label="Tiêu đề"
              required
              class="mb-4"
            ></v-text-field>

            <v-textarea
              v-model="noteDialog.note.content"
              label="Nội dung"
              rows="5"
              class="mb-4"
            ></v-textarea>

            <v-select
              v-model="noteDialog.note.categories"
              :items="categories"
              item-title="name"
              item-value="id"
              label="Danh mục"
              multiple
              chips
              class="mb-4"
            ></v-select>

            <v-select
              v-model="noteDialog.note.tags"
              :items="tags"
              item-title="name"
              item-value="id"
              label="Nhãn"
              multiple
              chips
              class="mb-4"
            ></v-select>

            <v-switch
              v-model="noteDialog.note.is_pinned"
              label="Ghim ghi chú"
            ></v-switch>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="noteDialog.show = false">
            Hủy
          </v-btn>
          <v-btn color="primary" @click="saveNote">
            {{ noteDialog.isEdit ? 'Cập nhật' : 'Tạo' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog tạo danh mục -->
    <v-dialog v-model="categoryDialog.show" max-width="400px">
      <v-card>
        <v-card-title>Thêm danh mục mới</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="categoryDialog.name"
            label="Tên danh mục"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="categoryDialog.show = false">
            Hủy
          </v-btn>
          <v-btn color="primary" @click="createCategory">
            Tạo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog tạo nhãn -->
    <v-dialog v-model="tagDialog.show" max-width="400px">
      <v-card>
        <v-card-title>Thêm nhãn mới</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="tagDialog.name"
            label="Tên nhãn"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="tagDialog.show = false">
            Hủy
          </v-btn>
          <v-btn color="primary" @click="createTag">
            Tạo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Loading overlay -->
    <v-overlay :model-value="loading" class="align-center justify-center">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useNoteStore } from '@/stores/notes';
import NoteCard from '@/components/NoteCard.vue';

export default {
  name: 'HomeView',
  components: {
    NoteCard
  },

  setup() {
    const noteStore = useNoteStore();
    const selectedCategory = ref(null);
    const selectedTags = ref([]);

    const noteDialog = ref({
      show: false,
      isEdit: false,
      note: {
        title: '',
        content: '',
        is_pinned: false,
        categories: [],
        tags: []
      }
    });

    const categoryDialog = ref({
      show: false,
      name: ''
    });

    const tagDialog = ref({
      show: false,
      name: ''
    });

    // Getters
    const loading = computed(() => noteStore.loading);
    const categories = computed(() => noteStore.categories);
    const tags = computed(() => noteStore.tags);
    const notes = computed(() => {
      let filteredNotes = noteStore.notes;
      
      // Filter by category
      if (selectedCategory.value) {
        filteredNotes = noteStore.getNotesByCategory(selectedCategory.value);
      }

      // Filter by tags
      if (selectedTags.value.length > 0) {
        filteredNotes = filteredNotes.filter(note => 
          selectedTags.value.every(tagId => 
            note.tags?.some(noteTag => noteTag.id === tagId)
          )
        );
      }

      return filteredNotes;
    });

    const pinnedNotes = computed(() => 
      notes.value.filter(note => note.is_pinned)
    );

    const unpinnedNotes = computed(() => 
      notes.value.filter(note => !note.is_pinned)
    );

    // Methods
    const openCreateNoteDialog = () => {
      noteDialog.value = {
        show: true,
        isEdit: false,
        note: {
          title: '',
          content: '',
          is_pinned: false,
          categories: [],
          tags: []
        }
      };
    };

    const openEditNoteDialog = (note) => {
      noteDialog.value = {
        show: true,
        isEdit: true,
        note: { ...note }
      };
    };

    const saveNote = async () => {
      try {
        if (noteDialog.value.isEdit) {
          await noteStore.updateNote(
            noteDialog.value.note.id,
            noteDialog.value.note
          );
        } else {
          await noteStore.createNote(noteDialog.value.note);
        }
        noteDialog.value.show = false;
      } catch (error) {
        console.error('Save note error:', error);
        // TODO: Show error message
      }
    };

    const deleteNote = async (noteId) => {
      if (confirm('Bạn có chắc muốn xóa ghi chú này?')) {
        try {
          await noteStore.deleteNote(noteId);
        } catch (error) {
          console.error('Delete note error:', error);
          // TODO: Show error message
        }
      }
    };

    const togglePinNote = async (note) => {
      try {
        await noteStore.updateNote(note.id, {
          ...note,
          is_pinned: !note.is_pinned
        });
      } catch (error) {
        console.error('Toggle pin error:', error);
        // TODO: Show error message
      }
    };

    const openCategoryDialog = () => {
      categoryDialog.value.show = true;
      categoryDialog.value.name = '';
    };

    const createCategory = async () => {
      if (categoryDialog.value.name.trim()) {
        try {
          await noteStore.createCategory(categoryDialog.value.name);
          categoryDialog.value.show = false;
        } catch (error) {
          console.error('Create category error:', error);
          // TODO: Show error message
        }
      }
    };

    const openTagDialog = () => {
      tagDialog.value.show = true;
      tagDialog.value.name = '';
    };

    const createTag = async () => {
      if (tagDialog.value.name.trim()) {
        try {
          await noteStore.createTag(tagDialog.value.name);
          tagDialog.value.show = false;
        } catch (error) {
          console.error('Create tag error:', error);
          // TODO: Show error message
        }
      }
    };

    // Lifecycle hooks
    onMounted(async () => {
      try {
        await Promise.all([
          noteStore.fetchNotes(),
          noteStore.fetchCategories(),
          noteStore.fetchTags()
        ]);
      } catch (error) {
        console.error('Init error:', error);
        // TODO: Show error message
      }
    });

    return {
      loading,
      categories,
      tags,
      notes,
      selectedCategory,
      selectedTags,
      pinnedNotes,
      unpinnedNotes,
      noteDialog,
      categoryDialog,
      tagDialog,
      openCreateNoteDialog,
      openEditNoteDialog,
      saveNote,
      deleteNote,
      togglePinNote,
      openCategoryDialog,
      createCategory,
      openTagDialog,
      createTag
    };
  }
};
</script>

<style scoped>
/* Biến CSS để dễ dàng quản lý màu sắc, kích thước */
:root {
  --primary-text-color: #1f2937;
  --secondary-text-color: #6b7280;
  --light-gray-text: #9ca3af;
  --white-bg: #ffffff;
  --card-bg: #ffffff;
  --light-bg: #f9fafb;
  --border-color: #e5e7eb;
  --hover-border: #d1d5db;
  --active-blue: #3b82f6;
  --active-blue-light: #dbeafe;
  --card-border-radius: 12px;
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
  --card-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
}

.home-view {
  padding: 40px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: var(--primary-text-color);
  position: relative;
}

.home-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(219, 234, 254, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  position: relative;
  z-index: 1;
}

.home-header h1 {
  font-size: 2.5em;
  font-weight: 800;
  color: var(--primary-text-color);
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

.header-menu {
  color: var(--secondary-text-color);
  font-size: 1.5em;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.header-menu:hover {
  background-color: var(--light-bg);
  color: var(--primary-text-color);
}

/* Base styles for sections and titles */
.section-card-group {
  margin-bottom: 48px;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 1.2em;
  font-weight: 700;
  color: var(--primary-text-color);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
}

.section-title i {
  margin-right: 10px;
  font-size: 1.3em;
  opacity: 0.8;
}

/* Card List general styles */
.card-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* Card base styles */
.card {
  background: linear-gradient(145deg, #ffffff 0%, #f9fafb 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.01) 0%, rgba(147, 197, 253, 0.01) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--card-shadow-hover);
  border-color: var(--hover-border);
}

.card:hover::before {
  opacity: 1;
}

/* Specific styles for Recent Access cards */
.recent-access .card-list {
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 8px;
}

.card-new-page,
.card-add-new {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 180px;
  height: 120px;
  justify-content: space-between;
  flex-shrink: 0;
}

.card-new-page i,
.card-add-new i {
  font-size: 2em;
  color: var(--secondary-text-color);
  margin-bottom: 8px;
}

.card-new-page span:first-of-type,
.card-add-new span:first-of-type {
  font-weight: 600;
  font-size: 1em;
  color: var(--primary-text-color);
  line-height: 1.4;
}

.card-new-page .card-status {
  font-size: 0.85em;
  color: var(--light-gray-text);
  font-weight: 500;
}

.card-new-page.is-active {
  border: 2px solid var(--active-blue);
  background: linear-gradient(145deg, var(--active-blue-light) 0%, #ffffff 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15), 0 2px 6px rgba(59, 130, 246, 0.1);
}

.card-new-page.is-active i {
  color: var(--active-blue);
}

.card-add-new {
  border: 2px dashed var(--border-color);
  background: var(--light-bg);
  align-items: center;
  justify-content: center;
  color: var(--secondary-text-color);
}

.card-add-new:hover {
  border-color: var(--active-blue);
  color: var(--active-blue);
  background: var(--active-blue-light);
}

.card-add-new:hover i {
  color: var(--active-blue);
}

/* Specific styles for Explore cards */
.explore-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.explore-card {
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 260px;
}

.explore-card .card-thumbnail {
  width: 100%;
  height: 140px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.explore-card .card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.explore-card:hover .card-thumbnail img {
  transform: scale(1.05);
}

.explore-card h3 {
  font-size: 1.1em;
  font-weight: 700;
  color: var(--primary-text-color);
  margin: 16px 20px 8px 20px;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.explore-card .card-meta {
  font-size: 0.85em;
  color: var(--secondary-text-color);
  margin: 0 20px 20px 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.explore-card .card-meta i {
  margin-right: 6px;
  opacity: 0.8;
}

/* Empty state for Upcoming Events */
.empty-state-card {
  background: linear-gradient(145deg, var(--light-bg) 0%, #ffffff 100%);
  border: 2px dashed var(--border-color);
  border-radius: var(--card-border-radius);
  padding: 40px;
  text-align: center;
  color: var(--light-gray-text);
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.1em;
  transition: all 0.3s ease;
}

.empty-state-card:hover {
  border-color: var(--hover-border);
  color: var(--secondary-text-color);
  background: linear-gradient(145deg, #ffffff 0%, var(--light-bg) 100%);
}

/* Enhanced icon styles */
.icon-recent::before { content: "🕐"; font-size: 1.1em; }
.icon-doc::before { content: "📄"; font-size: 1.1em; }
.icon-plus::before { content: "➕"; font-size: 1.1em; }
.icon-compass::before { content: "🧭"; font-size: 1.1em; }
.icon-read::before { content: "📖"; font-size: 1em; }
.icon-time::before { content: "⏱️"; font-size: 1em; }
.icon-calendar::before { content: "📅"; font-size: 1.1em; }

/* Enhanced responsiveness */
@media (max-width: 768px) {
  .home-view {
    padding: 24px;
  }
  
  .home-header {
    margin-bottom: 32px;
  }
  
  .home-header h1 {
    font-size: 2em;
  }
  
  .section-card-group {
    margin-bottom: 36px;
  }
  
  .explore-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .card-new-page, 
  .card-add-new {
    width: 160px;
    height: 110px;
  }
  
  .card {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .home-view {
    padding: 20px;
  }
  
  .home-header h1 {
    font-size: 1.8em;
  }
  
  .recent-access .card-list {
    gap: 16px;
  }
  
  .card-new-page, 
  .card-add-new {
    width: 140px;
    height: 100px;
  }
}
</style>