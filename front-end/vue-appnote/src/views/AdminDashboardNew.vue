<template>
  <div class="admin-page">
    <!-- Sidebar -->
    <aside :class="['sidebar', { collapsed: !sidebarOpen }]">
      <div class="sidebar-header">
        <h2 v-if="sidebarOpen">Admin Panel</h2>
        <button @click="toggleSidebar" class="toggle-btn">
          <span v-if="sidebarOpen">✕</span>
          <span v-else>☰</span>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <button 
          v-for="item in menuItems" 
          :key="item.id"
          @click="activeTab = item.id"
          :class="['nav-item', { active: activeTab === item.id }]"
        >
          <span class="icon">{{ item.icon }}</span>
          <span v-if="sidebarOpen" class="label">{{ item.label }}</span>
        </button>
      </nav>

      <div v-if="sidebarOpen" class="sidebar-footer">
        <div class="user-info">
          <div class="avatar">A</div>
          <div class="user-details">
            <p class="user-name">Admin User</p>
            <p class="user-email">admin@notes.com</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              v-model="searchTerm"
              placeholder="Tìm kiếm người dùng, ghi chú..." 
            />
          </div>
        </div>
        
        <div class="header-right">
          <select v-model="selectedPeriod" class="period-select">
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="90days">90 ngày qua</option>
            <option value="1year">1 năm qua</option>
          </select>
          
          <button class="notification-btn">
            🔔
            <span class="badge">3</span>
          </button>
          
          <button @click="doAction('Export')" class="export-btn">
            📥 Export
          </button>
          
          <button @click="goBack" class="back-link">← Quay lại</button>
        </div>
      </header>

      <!-- Content Area -->
      <div class="content">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="tab-content">
          <!-- Stats Cards -->
          <div class="stats">
            <div v-for="(stat, index) in stats" :key="index" class="stat-card">
              <div class="stat-header">
                <div :class="['stat-icon', stat.colorClass]">
                  {{ stat.icon }}
                </div>
                <span :class="['stat-change', stat.trend === 'up' ? 'positive' : 'negative']">
                  {{ stat.change }}
                </span>
              </div>
              <h3 class="stat-value">{{ stat.value }}</h3>
              <p class="stat-label">{{ stat.label }}</p>
            </div>
          </div>

          <!-- Charts -->
          <div class="charts-grid">
            <div class="chart-card">
              <h3>📈 Tăng trưởng người dùng</h3>
              <div class="chart-placeholder">
                <p>Biểu đồ Line Chart</p>
                <small>Tích hợp Chart.js hoặc Vue-ChartJS</small>
              </div>
            </div>
            
            <div class="chart-card">
              <h3>🥧 Phân bổ người dùng</h3>
              <div class="chart-placeholder">
                <div class="pie-legend">
                  <div class="legend-item">
                    <span class="dot" style="background: #3b82f6"></span>
                    <span>Free Users: 52%</span>
                  </div>
                  <div class="legend-item">
                    <span class="dot" style="background: #8b5cf6"></span>
                    <span>Premium: 26%</span>
                  </div>
                  <div class="legend-item">
                    <span class="dot" style="background: #10b981"></span>
                    <span>Enterprise: 22%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity & Users -->
          <div class="info-grid">
            <!-- Recent Users -->
            <div class="info-card">
              <div class="card-header">
                <h3>👥 Người dùng gần đây</h3>
                <button class="view-all-btn">Xem tất cả →</button>
              </div>
              <div class="user-list">
                <div v-for="user in recentUsers" :key="user.id" class="user-item">
                  <div class="user-avatar">{{ user.name.charAt(0) }}</div>
                  <div class="user-info">
                    <p class="user-name">{{ user.name }}</p>
                    <p class="user-email">{{ user.email }}</p>
                  </div>
                  <span :class="['status-badge', user.status.toLowerCase()]">
                    {{ user.status }}
                  </span>
                  <button class="more-btn">⋮</button>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="info-card">
              <div class="card-header">
                <h3>⚡ Hoạt động gần đây</h3>
              </div>
              <div class="activity-list">
                <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
                  <span :class="['activity-icon', activity.type]">
                    {{ getActivityEmoji(activity.type) }}
                  </span>
                  <div class="activity-info">
                    <p><strong>{{ activity.user }}</strong> {{ activity.action }}</p>
                    <p class="activity-time">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Tab -->
        <div v-if="activeTab === 'users'" class="tab-content">
          <div class="table-card">
            <div class="table-header">
              <h2>👥 Quản lý người dùng</h2>
              <button @click="doAction('Add User')" class="add-btn">+ Thêm người dùng</button>
            </div>
            
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Người dùng</th>
                    <th>Gói</th>
                    <th>Trạng thái</th>
                    <th>Ngày tham gia</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in recentUsers" :key="user.id">
                    <td>
                      <div class="table-user">
                        <div class="user-avatar">{{ user.name.charAt(0) }}</div>
                        <div>
                          <p class="user-name">{{ user.name }}</p>
                          <p class="user-email">{{ user.email }}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span :class="['plan-badge', user.plan.toLowerCase()]">
                        {{ user.plan }}
                      </span>
                    </td>
                    <td>
                      <span :class="['status-badge', user.status.toLowerCase()]">
                        {{ user.status }}
                      </span>
                    </td>
                    <td>{{ user.joined }}</td>
                    <td>
                      <div class="action-buttons">
                        <button @click="doAction('View')" class="action-btn view" title="Xem">👁️</button>
                        <button @click="doAction('Edit')" class="action-btn edit" title="Sửa">✏️</button>
                        <button @click="doAction('Delete')" class="action-btn delete" title="Xóa">🗑️</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Other Tabs -->
        <div v-if="['notes', 'analytics', 'settings'].includes(activeTab)" class="tab-content">
          <div class="coming-soon">
            <div class="coming-soon-icon">🚧</div>
            <h3>Đang phát triển</h3>
            <p>Tính năng này sẽ sớm có mặt</p>
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
      sidebarOpen: true,
      activeTab: 'overview',
      selectedPeriod: '30days',
      searchTerm: '',
      
      menuItems: [
        { id: 'overview', label: 'Tổng quan', icon: '📊' },
        { id: 'users', label: 'Người dùng', icon: '👥' },
        { id: 'notes', label: 'Ghi chú', icon: '📝' },
        { id: 'analytics', label: 'Phân tích', icon: '📈' },
        { id: 'settings', label: 'Cài đặt', icon: '⚙️' }
      ],

      stats: [
        { icon: '👥', label: 'Tổng người dùng', value: '12,345', change: '+12.5%', trend: 'up', colorClass: 'blue' },
        { icon: '📝', label: 'Tổng ghi chú', value: '45,678', change: '+8.2%', trend: 'up', colorClass: 'green' },
        { icon: '⚡', label: 'Người dùng hoạt động', value: '8,234', change: '+15.3%', trend: 'up', colorClass: 'purple' },
        { icon: '💰', label: 'Doanh thu', value: '$23,456', change: '-3.1%', trend: 'down', colorClass: 'yellow' }
      ],

      recentUsers: [
        { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', plan: 'Premium', status: 'Active', joined: '01/10/2025' },
        { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', plan: 'Free', status: 'Active', joined: '28/09/2025' },
        { id: 3, name: 'Lê Minh C', email: 'leminhc@email.com', plan: 'Enterprise', status: 'Active', joined: '25/09/2025' },
        { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', plan: 'Premium', status: 'Inactive', joined: '20/09/2025' },
        { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@email.com', plan: 'Free', status: 'Active', joined: '18/09/2025' }
      ],

      recentActivity: [
        { id: 1, action: 'đã đăng ký', user: 'Nguyễn Văn A', time: '2 phút trước', type: 'success' },
        { id: 2, action: 'đã thanh toán', user: 'Trần Thị B', time: '15 phút trước', type: 'success' },
        { id: 3, action: 'tạo ghi chú mới', user: 'Lê Minh C', time: '1 giờ trước', type: 'info' },
        { id: 4, action: 'báo cáo lỗi', user: 'Phạm Thị D', time: '2 giờ trước', type: 'warning' },
        { id: 5, action: 'xóa tài khoản', user: 'Hoàng Văn E', time: '3 giờ trước', type: 'error' }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    doAction(name) {
      alert('Thao tác: ' + name);
    },
    goBack() {
      alert('Quay lại trang chủ');
    },
    getActivityEmoji(type) {
      const emojis = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };
      return emojis[type] || 'ℹ️';
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

.admin-page {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  box-shadow: 4px 0 10px rgba(0,0,0,0.1);
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.sidebar-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

.toggle-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle-btn:hover {
  background: rgba(255,255,255,0.3);
  transform: scale(1.05);
}

.sidebar-nav {
  flex: 1;
  padding: 1rem;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 0.5rem;
  text-align: left;
}

.nav-item:hover {
  background: rgba(255,255,255,0.1);
}

.nav-item.active {
  background: rgba(255,255,255,0.2);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.nav-item .icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.user-details {
  flex: 1;
}

.user-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.user-email {
  font-size: 0.8rem;
  opacity: 0.8;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
}

.header-left {
  flex: 1;
  max-width: 500px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.search-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  outline: none;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.period-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  background: white;
}

.notification-btn {
  position: relative;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.3s;
}

.notification-btn:hover {
  background: #f3f4f6;
}

.badge {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
}

.export-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
}

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.4);
}

.back-link {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.back-link:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: #f9fafb;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.12);
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-icon.blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.stat-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.stat-icon.purple { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }
.stat-icon.yellow { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }

.stat-change {
  font-weight: 600;
  font-size: 0.9rem;
}

.stat-change.positive { color: #10b981; }
.stat-change.negative { color: #ef4444; }

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #6b7280;
  font-size: 0.9rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.chart-card h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.chart-placeholder {
  height: 250px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.pie-legend {
  text-align: left;
  width: 100%;
  max-width: 300px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.75rem 0;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header h3 {
  font-size: 1.2rem;
  color: #1f2937;
}

.view-all-btn {
  background: transparent;
  border: none;
  color: #4f46e5;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.view-all-btn:hover {
  color: #7c3aed;
}

.user-list {
  max-height: 400px;
  overflow-y: auto;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.3s;
}

.user-item:hover {
  background: #f9fafb;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
}

.user-info .user-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.user-info .user-email {
  font-size: 0.85rem;
  color: #6b7280;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.active {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.inactive {
  background: #f3f4f6;
  color: #6b7280;
}

.more-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s;
}

.more-btn:hover {
  background: #f3f4f6;
  color: #4b5563;
}

.activity-list {
  max-height: 400px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.3s;
}

.activity-item:hover {
  background: #f9fafb;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.activity-icon.success { background: #d1fae5; }
.activity-icon.error { background: #fee2e2; }
.activity-icon.warning { background: #fef3c7; }
.activity-icon.info { background: #dbeafe; }

.activity-info {
  flex: 1;
}

.activity-info p {
  color: #1f2937;
  font-size: 0.9rem;
  line-height: 1.5;
}

.activity-time {
  color: #9ca3af;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.table-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
}

.table-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-header h2 {
  font-size: 1.5rem;
  color: #1f2937;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-btn:hover {
  background: #4338ca;
  transform: translateY(-2px);
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #f9fafb;
}

.data-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.5px;
}

.data-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.3s;
}

.data-table tbody tr:hover {
  background: #f9fafb;
}

.data-table td {
  padding: 1rem 1.5rem;
  color: #1f2937;
}

.table-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.table-user .user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.table-user .user-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.table-user .user-email {
  font-size: 0.85rem;
  color: #6b7280;
}

.plan-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
}

.plan-badge.enterprise {
  background: #ede9fe;
  color: #6b21a8;
}

.plan-badge.premium {
  background: #dbeafe;
  color: #1e40af;
}

.plan-badge.free {
  background: #f3f4f6;
  color: #4b5563;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn.view {
  background: #dbeafe;
  color: #1e40af;
}

.action-btn.view:hover {
  background: #bfdbfe;
  transform: scale(1.1);
}

.action-btn.edit {
  background: #d1fae5;
  color: #065f46;
}

.action-btn.edit:hover {
  background: #a7f3d0;
  transform: scale(1.1);
}

.action-btn.delete {
  background: #fee2e2;
  color: #991b1b;
}

.action-btn.delete:hover {
  background: #fecaca;
  transform: scale(1.1);
}

.coming-soon {
  background: white;
  border-radius: 12px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.coming-soon-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
}

.coming-soon h3 {
  font-size: 1.8rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.coming-soon p {
  color: #6b7280;
  font-size: 1.1rem;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f3f4f6;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
  }
  
  .sidebar .label {
    display: none;
  }
  
  .sidebar-footer {
    display: none;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-left,
  .header-right {
    width: 100%;
  }
  
  .header-right {
    flex-wrap: wrap;
  }
  
  .stats {
    grid-template-columns: 1fr;
  }
  
  .charts-grid,
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .table-wrapper {
    overflow-x: scroll;
  }
  
  .data-table {
    min-width: 800px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    position: fixed;
    left: -280px;
    z-index: 100;
    height: 100%;
  }
  
  .sidebar.open {
    left: 0;
  }
  
  .content {
    padding: 1rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
}
</style>