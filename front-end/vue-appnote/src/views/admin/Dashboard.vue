<template>
  <div class="admin-dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Users</h3>
        <div class="stat-value">{{ stats.totalUsers }}</div>
        <div class="stat-change">
          <i class="fas fa-arrow-up"></i>
          +{{ stats.newUsers }} this week
        </div>
      </div>

      <div class="stat-card">
        <h3>Total Notes</h3>
        <div class="stat-value">{{ stats.totalNotes }}</div>
        <div class="stat-change">
          <i class="fas fa-arrow-up"></i>
          +{{ stats.newNotes }} this week
        </div>
      </div>

      <div class="stat-card">
        <h3>Active Users</h3>
        <div class="stat-value">{{ stats.activeUsers }}</div>
        <div class="stat-info">In the last 24 hours</div>
      </div>

      <div class="stat-card">
        <h3>Storage Used</h3>
        <div class="stat-value">{{ formatStorage(stats.storageUsed) }}</div>
        <div class="stat-info">Of {{ formatStorage(stats.storageLimit) }}</div>
      </div>
    </div>

    <div class="recent-activity">
      <h3>Recent Activity</h3>
      <div class="activity-list">
        <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
          <i :class="activity.icon"></i>
          <div class="activity-content">
            <div class="activity-text">{{ activity.text }}</div>
            <div class="activity-time">{{ formatTime(activity.timestamp) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      stats: {
        totalUsers: 0,
        newUsers: 0,
        totalNotes: 0,
        newNotes: 0,
        activeUsers: 0,
        storageUsed: 0,
        storageLimit: 1024 * 1024 * 1024 * 10 // 10GB
      },
      recentActivities: []
    }
  },
  methods: {
    formatStorage(bytes) {
      const units = ['B', 'KB', 'MB', 'GB'];
      let size = bytes;
      let unitIndex = 0;
      
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
      
      return `${size.toFixed(1)} ${units[unitIndex]}`;
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
    async fetchStats() {
      try {
        // TODO: Replace with actual API call
        const response = await this.$http.get('/api/admin/stats');
        this.stats = response.data;
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    },
    async fetchRecentActivities() {
      try {
        // TODO: Replace with actual API call
        const response = await this.$http.get('/api/admin/activities');
        this.recentActivities = response.data;
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    }
  },
  mounted() {
    // Temporary mock data
    this.stats = {
      totalUsers: 150,
      newUsers: 12,
      totalNotes: 1250,
      newNotes: 45,
      activeUsers: 25,
      storageUsed: 1024 * 1024 * 512, // 512MB
      storageLimit: 1024 * 1024 * 1024 * 10 // 10GB
    };
    
    this.recentActivities = [
      {
        id: 1,
        icon: 'fas fa-user-plus',
        text: 'New user registered: John Doe',
        timestamp: new Date().getTime() - 1000 * 60 * 5
      },
      {
        id: 2,
        icon: 'fas fa-file-alt',
        text: 'New note created by: Jane Smith',
        timestamp: new Date().getTime() - 1000 * 60 * 15
      },
      {
        id: 3,
        icon: 'fas fa-share-alt',
        text: 'Note shared with 3 users by: Mike Johnson',
        timestamp: new Date().getTime() - 1000 * 60 * 30
      }
    ];
  }
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-card h3 {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.stat-change {
  color: #27ae60;
  font-size: 0.9rem;
}

.stat-info {
  color: #666;
  font-size: 0.9rem;
}

.recent-activity {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.recent-activity h3 {
  margin: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.activity-item i {
  background: #f0f0f0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: #2c3e50;
  margin-bottom: 5px;
}

.activity-time {
  color: #666;
  font-size: 0.8rem;
}
</style>