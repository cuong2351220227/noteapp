<template>
  <div class="study-plan-view">
    <h1>Kế hoạch học tập</h1>
    <div class="planner-container">
      <div class="calendar-section">
        <div class="calendar-header">
          <button @click="previousMonth" class="nav-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h2>{{ currentMonthYear }}</h2>
          <button @click="nextMonth" class="nav-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="calendar-grid">
          <div v-for="day in weekDays" :key="day" class="weekday-header">{{ day }}</div>
          <div v-for="day in calendarDays" :key="day.date" 
               :class="['calendar-day', { 'today': day.isToday, 'other-month': day.isOtherMonth }]">
            {{ day.day }}
          </div>
        </div>
      </div>
      <div class="tasks-section">
        <h2>Nhiệm vụ hôm nay</h2>
        <div class="add-task">
          <input 
            type="text" 
            v-model="newTask" 
            placeholder="Thêm nhiệm vụ mới..."
            @keyup.enter="addTask"
          >
          <button @click="addTask" class="add-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="tasks-list">
          <div v-for="task in tasks" :key="task.id" class="task-item">
            <div class="task-checkbox" @click="toggleTask(task.id)">
              <svg v-if="task.completed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <span :class="['task-title', { completed: task.completed }]">{{ task.title }}</span>
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
      ],
      weekDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
    }
  },
  computed: {
    currentMonthYear() {
      return this.currentDate.toLocaleDateString('vi-VN', {
        month: 'long',
        year: 'numeric'
      });
    },
    calendarDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const prevLastDay = new Date(year, month, 0);
      const today = new Date();
      
      const days = [];
      const startDay = firstDay.getDay();
      
      // Ngày của tháng trước
      for (let i = startDay - 1; i >= 0; i--) {
        days.push({
          day: prevLastDay.getDate() - i,
          date: `prev-${prevLastDay.getDate() - i}`,
          isOtherMonth: true,
          isToday: false
        });
      }
      
      // Ngày của tháng hiện tại
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const isToday = today.getDate() === i && 
                       today.getMonth() === month && 
                       today.getFullYear() === year;
        days.push({
          day: i,
          date: `current-${i}`,
          isOtherMonth: false,
          isToday
        });
      }
      
      // Ngày của tháng sau
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          day: i,
          date: `next-${i}`,
          isOtherMonth: true,
          isToday: false
        });
      }
      
      return days;
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.study-plan-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

h1 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
  font-weight: 700;
}

.planner-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
}

.calendar-section {
  background: white;
  border-radius: 24px;
  padding: 35px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.calendar-header h2 {
  font-size: 1.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: capitalize;
  font-weight: 700;
}

.nav-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.nav-btn:active {
  transform: translateY(0);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.weekday-header {
  font-weight: 700;
  color: #667eea;
  text-align: center;
  padding: 15px 0;
  font-size: 0.9rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
  color: #2d3748;
  font-size: 1rem;
}

.calendar-day:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.calendar-day.today {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 700;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.5);
}

.calendar-day.other-month {
  color: #cbd5e0;
  background: transparent;
}

.calendar-day.other-month:hover {
  background: #f1f3f5;
  color: #a0aec0;
  transform: scale(1.05);
}

.tasks-section {
  background: white;
  border-radius: 24px;
  padding: 35px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
}

.tasks-section h2 {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 25px;
  font-weight: 700;
}

.add-task {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.add-task input {
  flex: 1;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.add-task input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-btn {
  padding: 14px 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.add-btn:active {
  transform: translateY(0);
}

.tasks-list {
  flex: 1;
  overflow-y: auto;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;
}

.task-item:hover {
  background: #f1f3f5;
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.task-checkbox {
  margin-right: 15px;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.task-checkbox:hover {
  transform: scale(1.2);
}

.task-title {
  flex: 1;
  font-size: 1rem;
  color: #2d3748;
  font-weight: 500;
  transition: all 0.3s ease;
}

.task-title.completed {
  text-decoration: line-through;
  color: #a0aec0;
}

.task-time {
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
  background: rgba(102, 126, 234, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
}

@media (max-width: 1024px) {
  .planner-container {
    grid-template-columns: 1fr;
  }
}
</style>