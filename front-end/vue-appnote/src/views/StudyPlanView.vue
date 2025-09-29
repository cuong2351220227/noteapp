<template>
  <div class="study-plan-view">
    <h1>Kế hoạch học tập</h1>
    <div class="planner-container">
      <div class="calendar-section">
        <div class="calendar-header">
          <button @click="previousMonth">&lt;</button>
          <h2>{{ currentMonthYear }}</h2>
          <button @click="nextMonth">&gt;</button>
        </div>
        <div class="calendar-grid">
          <!-- Calendar implementation would go here -->
        </div>
      </div>
      <div class="tasks-section">
        <h2>Nhiệm vụ hôm nay</h2>
        <div class="add-task">
          <input 
            type="text" 
            v-model="newTask" 
            placeholder="Thêm nhiệm vụ mới"
            @keyup.enter="addTask"
          >
          <button @click="addTask">+</button>
        </div>
        <div class="tasks-list">
          <div v-for="task in tasks" :key="task.id" class="task-item">
            <input 
              type="checkbox" 
              :checked="task.completed"
              @change="toggleTask(task.id)"
            >
            <span :class="{ completed: task.completed }">{{ task.title }}</span>
            <span class="task-time">{{ task.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudyPlanView',
  data() {
    return {
      currentDate: new Date(),
      newTask: '',
      tasks: [
        { id: 1, title: 'Ôn tập Toán', time: '09:00', completed: false },
        { id: 2, title: 'Làm bài tập Vật lý', time: '11:00', completed: true },
        { id: 3, title: 'Học từ vựng Tiếng Anh', time: '14:00', completed: false }
      ]
    }
  },
  computed: {
    currentMonthYear() {
      return this.currentDate.toLocaleDateString('vi-VN', {
        month: 'long',
        year: 'numeric'
      });
    }
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      );
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      );
    },
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({
          id: Date.now(),
          title: this.newTask,
          time: new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          completed: false
        });
        this.newTask = '';
      }
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    }
  }
}
</script>

<style scoped>
.study-plan-view {
  padding: 20px;
}

.planner-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  margin-top: 20px;
}

.calendar-section {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-header button {
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.calendar-header button:hover {
  background-color: #f5f5f5;
}

.tasks-section {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-task input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-task button {
  padding: 8px 15px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-task button:hover {
  background-color: #1d4ed8;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.task-item input[type="checkbox"] {
  margin-right: 10px;
}

.task-item .completed {
  text-decoration: line-through;
  color: #666;
}

.task-time {
  margin-left: auto;
  color: #666;
  font-size: 14px;
}
</style>