<template>
  <div class="admin-overview">
    <h1 class="page-title">Tổng quan hệ thống</h1>

    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.id">
        <div class="stat-icon" :style="{ background: stat.color }">
          <i :class="stat.icon"></i>
        </div>
        <div class="stat-info">
          <h3 class="stat-value">{{ stat.value }}</h3>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
        <div class="stat-change" :class="stat.trend">
          <i :class="stat.trend === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
          {{ stat.changePercent }}%
        </div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <div class="card-header">
          <h3>Người dùng mới</h3>
          <div class="card-actions">
            <select v-model="userChartPeriod" class="period-select">
              <option value="day">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
            </select>
          </div>
        </div>
        <div class="chart-container">
          <!-- Add your chart component here -->
        </div>
      </div>

      <div class="chart-card">
        <div class="card-header">
          <h3>Hoạt động hệ thống</h3>
          <div class="card-actions">
            <button 
              v-for="period in activityPeriods" 
              :key="period.value"
              :class="['period-btn', { active: activityPeriod === period.value }]"
              @click="activityPeriod = period.value"
            >
              {{ period.label }}
            </button>
          </div>
        </div>
        <div class="chart-container">
          <!-- Add your chart component here -->
        </div>
      </div>
    </div>

    <div class="recent-activity">
      <h2 class="section-title">Hoạt động gần đây</h2>
      <div class="activity-list">
        <div 
          v-for="activity in recentActivities" 
          :key="activity.id" 
          class="activity-item"
        >
          <div class="activity-icon" :class="activity.type">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          <div class="activity-content">
            <p class="activity-text">
              <span class="user">{{ activity.user }}</span>
              {{ activity.action }}
            </p>
            <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'AdminOverview',
  
  setup() {
    const stats = ref([
      {
        id: 1,
        label: 'Tổng người dùng',
        value: '1,234',
        icon: 'fas fa-users',
        color: '#4C51BF',
        trend: 'up',
        changePercent: 12
      },
      {
        id: 2,
        label: 'Ghi chú đã tạo',
        value: '5,678',
        icon: 'fas fa-sticky-note',
        color: '#48BB78',
        trend: 'up',
        changePercent: 8
      },
      {
        id: 3,
        label: 'Dung lượng sử dụng',
        value: '2.3 GB',
        icon: 'fas fa-hdd',
        color: '#4299E1',
        trend: 'down',
        changePercent: 3
      },
      {
        id: 4,
        label: 'Người dùng hoạt động',
        value: '892',
        icon: 'fas fa-user-clock',
        color: '#ED8936',
        trend: 'up',
        changePercent: 15
      }
    ]);

    const userChartPeriod = ref('week');
    const activityPeriod = ref('24h');
    
    const activityPeriods = [
      { label: '24H', value: '24h' },
      { label: '7D', value: '7d' },
      { label: '30D', value: '30d' }
    ];

    const recentActivities = ref([]);

    onMounted(async () => {
      await loadRecentActivities();
    });

    const loadRecentActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3002/api/admin/activities', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          recentActivities.value = data.activities;
        }
      } catch (error) {
        console.error('Error loading activities:', error);
      }
    };

    const getActivityIcon = (type) => {
      const icons = {
        login: 'fas fa-sign-in-alt',
        create: 'fas fa-plus-circle',
        update: 'fas fa-edit',
        delete: 'fas fa-trash-alt',
        upload: 'fas fa-upload'
      };
      return icons[type] || 'fas fa-info-circle';
    };

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };

    return {
      stats,
      userChartPeriod,
      activityPeriod,
      activityPeriods,
      recentActivities,
      getActivityIcon,
      formatTime
    };
  }
};
</script>

<style scoped>
.admin-overview {
  padding: 1rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.stat-change {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change.up {
  background: #C6F6D5;
  color: #2F855A;
}

.stat-change.down {
  background: #FED7D7;
  color: #C53030;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.period-select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.period-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background: white;
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.period-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.chart-container {
  height: 300px;
}

/* Recent Activity */
.recent-activity {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: var(--bg-primary);
  transition: all 0.2s;
}

.activity-item:hover {
  transform: translateX(4px);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.activity-icon.login { background: #4299E1; }
.activity-icon.create { background: #48BB78; }
.activity-icon.update { background: #ED8936; }
.activity-icon.delete { background: #F56565; }
.activity-icon.upload { background: #667EEA; }

.activity-content {
  flex: 1;
}

.activity-text {
  margin: 0 0 0.25rem 0;
  color: var(--text-secondary);
}

.activity-text .user {
  font-weight: 600;
  color: var(--text-primary);
}

.activity-time {
  font-size: 0.75rem;
  color: var(--text-light);
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .activity-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
  }
  
  .activity-icon {
    margin: 0 auto;
  }
}
</style>