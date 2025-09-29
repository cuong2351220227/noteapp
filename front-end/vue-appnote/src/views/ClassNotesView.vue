<template>
  <div class="class-notes-view">
    <h1>Ghi chú lớp học</h1>
    <div class="notes-container">
      <div class="notes-sidebar">
        <div class="add-subject">
          <button @click="addNewSubject" class="add-button">+ Thêm môn học mới</button>
        </div>
        <div class="subjects-list">
          <div 
            v-for="subject in subjects" 
            :key="subject.id"
            :class="['subject-item', { active: currentSubject === subject.id }]"
            @click="selectSubject(subject.id)"
          >
            <span class="subject-icon">📚</span>
            <span class="subject-name">{{ subject.name }}</span>
          </div>
        </div>
      </div>
      <div class="notes-content">
        <div class="content-header">
          <h2>{{ currentSubjectName }}</h2>
          <button @click="addNewNote" class="add-button">+ Ghi chú mới</button>
        </div>
        <div class="notes-list">
          <div v-for="note in filteredNotes" :key="note.id" class="note-card">
            <div class="note-header">
              <h3>{{ note.title }}</h3>
              <span class="note-date">{{ note.date }}</span>
            </div>
            <p class="note-preview">{{ note.preview }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassNotesView',
  data() {
    return {
      currentSubject: 1,
      subjects: [
        { id: 1, name: 'Toán học' },
        { id: 2, name: 'Vật lý' },
        { id: 3, name: 'Hóa học' },
        { id: 4, name: 'Sinh học' }
      ],
      notes: [
        {
          id: 1,
          subjectId: 1,
          title: 'Đạo hàm và ứng dụng',
          date: '2023-09-27',
          preview: 'Các công thức đạo hàm cơ bản và ứng dụng trong bài toán thực tế...'
        },
        {
          id: 2,
          subjectId: 1,
          title: 'Tích phân',
          date: '2023-09-26',
          preview: 'Phương pháp tính tích phân và các bài tập ví dụ...'
        }
      ]
    }
  },
  computed: {
    currentSubjectName() {
      const subject = this.subjects.find(s => s.id === this.currentSubject);
      return subject ? subject.name : '';
    },
    filteredNotes() {
      return this.notes.filter(note => note.subjectId === this.currentSubject);
    }
  },
  methods: {
    selectSubject(id) {
      this.currentSubject = id;
    },
    addNewSubject() {
      // Add logic to create new subject
      console.log('Adding new subject');
    },
    addNewNote() {
      // Add logic to create new note
      console.log('Adding new note for subject:', this.currentSubjectName);
    }
  }
}
</script>

<style scoped>
.class-notes-view {
  padding: 20px;
}

.notes-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  height: calc(100vh - 120px);
}

.notes-sidebar {
  width: 250px;
  border-right: 1px solid #eee;
  padding-right: 20px;
}

.notes-content {
  flex: 1;
}

.add-button {
  width: 100%;
  padding: 10px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.add-button:hover {
  background-color: #1d4ed8;
}

.subjects-list {
  margin-top: 20px;
}

.subject-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border-radius: 6px;
  cursor: pointer;
}

.subject-item:hover {
  background-color: #f3f4f6;
}

.subject-item.active {
  background-color: #e5e7eb;
}

.subject-icon {
  margin-right: 10px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.notes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.note-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.note-card:hover {
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.note-header h3 {
  margin: 0;
  font-size: 16px;
}

.note-date {
  font-size: 12px;
  color: #666;
}

.note-preview {
  color: #666;
  font-size: 14px;
  margin: 0;
  display: -webkit-box;
    
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>