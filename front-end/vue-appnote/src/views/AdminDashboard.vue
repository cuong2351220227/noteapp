<template>
  <div class="admin-dashboard">
    <!-- Mobile Menu Toggle -->
    <div class="mobile-menu-toggle" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </div>

    <!-- Sidebar -->
    <div class="dashboard-sidebar" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="sidebar-header">
        <div class="brand">
          <div class="brand-logo">
            <div class="logo-circle">
              <i class="fas fa-bolt"></i>
            </div>
          </div>
          <div class="brand-text">
            <h2>AdminHub</h2>
            <span>Dashboard Pro</span>
          </div>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-section">
          <span class="section-title">CHÍNH</span>
          <router-link 
            v-for="item in mainMenuItems" 
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: currentRoute === item.path }"
            @click="closeMobileSidebar"
          >
            <div class="nav-icon">
              <i :class="item.icon"></i>
            </div>
            <span class="nav-text">{{ item.name }}</span>
            <div class="nav-indicator"></div>
          </router-link>
        </div>

        <div class="nav-section">
          <span class="section-title">QUẢN LÝ</span>
          <router-link 
            v-for="item in managementMenuItems" 
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: currentRoute === item.path }"
            @click="closeMobileSidebar"
          >
            <div class="nav-icon">
              <i :class="item.icon"></i>
            </div>
            <span class="nav-text">{{ item.name }}</span>
            <div class="nav-indicator"></div>
          </router-link>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="admin-card">
          <div class="admin-avatar">
            <img :src="adminAvatar" alt="Admin" />
            <div class="status-dot"></div>
          </div>
          <div class="admin-info">
            <span class="admin-name">{{ adminName }}</span>
            <span class="admin-role">Administrator</span>
          </div>
          <button @click="showUserMenu" class="user-menu-btn">
            <i class="fas fa-chevron-up"></i>
          </button>
        </div>
        
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="dashboard-main">
      <!-- Header -->
      <header class="main-header">
        <div class="header-left">
          <div class="page-title">
            <h1>{{ pageTitle }}</h1>
            <span class="page-subtitle">{{ pageSubtitle }}</span>
          </div>
        </div>
        
        <div class="header-right">
          <!-- Search -->
          <div class="header-search">
            <div class="search-input">
              <i class="fas fa-search"></i>
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Tìm kiếm..."
                @input="handleSearch"
                @focus="searchFocused = true"
                @blur="searchFocused = false"
              >
            </div>
          </div>
          
          <!-- Actions -->
          <div class="header-actions">
            <!-- Notifications -->
            <div class="action-item notification-bell" @click="toggleNotifications">
              <i class="fas fa-bell"></i>
              <span v-if="notifications.length" class="notification-badge">
                {{ notifications.length }}
              </span>
              <div class="notification-panel" v-if="showNotifications" @click.stop>
                <div class="panel-header">
                  <h4>Thông báo</h4>
                  <button class="mark-read-btn">Đánh dấu đã đọc</button>
                </div>
                <div class="notification-list">
                  <div v-for="notification in notifications" :key="notification.id" class="notification-item">
                    <div class="notification-icon">
                      <i :class="notification.icon"></i>
                    </div>
                    <div class="notification-content">
                      <p>{{ notification.message }}</p>
                      <span class="notification-time">{{ notification.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="action-item" @click="refreshData">
              <i class="fas fa-sync-alt" :class="{ spinning: isRefreshing }"></i>
            </div>
            
            <div class="action-item" @click="openSettings">
              <i class="fas fa-cog"></i>
            </div>

            <!-- Theme Toggle -->
            <div class="action-item theme-toggle" @click="toggleTheme">
              <i :class="isDarkTheme ? 'fas fa-sun' : 'fas fa-moon'"></i>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>

    <!-- Overlay for mobile -->
    <div class="sidebar-overlay" 
         v-if="sidebarOpen" 
         @click="closeMobileSidebar"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'AdminDashboard',
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    
    // Reactive data
    const searchQuery = ref('');
    const searchFocused = ref(false);
    const notifications = ref([
      { id: 1, message: 'Người dùng mới đã đăng ký', time: '5 phút trước', icon: 'fas fa-user-plus' },
      { id: 2, message: 'Báo cáo hàng tháng sẵn sàng', time: '1 giờ trước', icon: 'fas fa-chart-line' },
      { id: 3, message: 'Cập nhật hệ thống hoàn tất', time: '2 giờ trước', icon: 'fas fa-check-circle' }
    ]);
    const showNotifications = ref(false);
    const sidebarOpen = ref(false);
    const adminAvatar = ref('/api/placeholder/40/40');
    const adminName = ref('Nguyễn Văn A');
    const isRefreshing = ref(false);
    const isDarkTheme = ref(false);

    // Menu items
    const mainMenuItems = [
      { name: 'Tổng quan', path: '/admin/dashboard', icon: 'fas fa-home' },
      { name: 'Analytics', path: '/admin/analytics', icon: 'fas fa-chart-line' },
      { name: 'Thống kê', path: '/admin/stats', icon: 'fas fa-chart-bar' }
    ];

    const managementMenuItems = [
      { name: 'Người dùng', path: '/admin/users', icon: 'fas fa-users' },
      { name: 'Sản phẩm', path: '/admin/products', icon: 'fas fa-box' },
      { name: 'Đơn hàng', path: '/admin/orders', icon: 'fas fa-shopping-cart' },
      { name: 'Cài đặt', path: '/admin/settings', icon: 'fas fa-cog' }
    ];

    // Computed
    const currentRoute = computed(() => route.path);
    
    const pageTitle = computed(() => {
      const currentItem = [...mainMenuItems, ...managementMenuItems]
        .find(item => item.path === route.path);
      return currentItem?.name || 'Dashboard';
    });

    const pageSubtitle = computed(() => {
      const subtitles = {
        '/admin/dashboard': 'Xem tổng quan hệ thống',
        '/admin/users': 'Quản lý người dùng hệ thống',
        '/admin/analytics': 'Phân tích dữ liệu',
        '/admin/stats': 'Thống kê hệ thống',
        '/admin/settings': 'Cài đặt hệ thống'
      };
      return subtitles[route.path] || 'Quản lý và điều hành';
    });

    // Methods
    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    const closeMobileSidebar = () => {
      if (window.innerWidth <= 1024) {
        sidebarOpen.value = false;
      }
    };

    const handleSearch = () => {
      console.log('Searching for:', searchQuery.value);
    };

    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value;
    };

    const refreshData = async () => {
      isRefreshing.value = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await loadNotifications();
      } catch (error) {
        console.error('Error refreshing data:', error);
      } finally {
        isRefreshing.value = false;
      }
    };

    const openSettings = () => {
      router.push('/admin/settings');
    };

    const showUserMenu = () => {
      console.log('Show user menu');
    };

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      document.documentElement.classList.toggle('dark-theme', isDarkTheme.value);
    };

    const logout = () => {
      router.push('/login');
    };

    const loadNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/admin/notifications');
        if (response.ok) {
          const data = await response.json();
          notifications.value = data.notifications;
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    // Lifecycle
    onMounted(async () => {
      try {
        await loadNotifications();
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
      
      document.addEventListener('click', (event) => {
        if (!event.target.closest('.notification-bell')) {
          showNotifications.value = false;
        }
      });
    });

    return {
      searchQuery,
      searchFocused,
      notifications,
      showNotifications,
      sidebarOpen,
      mainMenuItems,
      managementMenuItems,
      currentRoute,
      pageTitle,
      pageSubtitle,
      adminAvatar,
      adminName,
      isRefreshing,
      isDarkTheme,
      toggleSidebar,
      closeMobileSidebar,
      handleSearch,
      toggleNotifications,
      refreshData,
      openSettings,
      showUserMenu,
      toggleTheme,
      logout
    };
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --primary-dark: #4f46e5;
  --secondary: #f1f5f9;
  --accent: #06b6d4;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.16);
  --sidebar-width: 280px;
  --header-height: 80px;
}

body {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.admin-dashboard {
  display: flex;
  min-height: 100vh;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 1001;
  background: white;
  border: none;
  border-radius: 14px;
  padding: 0.9rem;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  color: var(--primary);
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

.mobile-menu-toggle i {
  font-size: 1.2rem;
}

/* Sidebar */
.dashboard-sidebar {
  width: var(--sidebar-width);
  background: white;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 0 24px rgba(0,0,0,0.06);
}

.sidebar-header {
  padding: 2rem 1.75rem;
  background: var(--bg-gradient);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-logo .logo-circle {
  width: 52px;
  height: 52px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.brand-text h2 {
  font-size: 1.6rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.125rem;
  text-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.brand-text span {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 1.75rem 1rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}

.nav-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  margin-bottom: 0.5rem;
  border-radius: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.nav-item:hover {
  background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(118,75,162,0.08) 100%);
  color: var(--primary);
  transform: translateX(6px);
}

.nav-item.active {
  background: var(--bg-gradient);
  color: white;
  box-shadow: 0 4px 20px rgba(99,102,241,0.35);
  transform: translateX(0);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: white;
  border-radius: 0 4px 4px 0;
  opacity: 0.8;
}

.nav-icon {
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.nav-text {
  flex: 1;
}

.nav-indicator {
  width: 8px;
  height: 8px;
  background: rgba(255,255,255,0.9);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  box-shadow: 0 0 8px rgba(255,255,255,0.6);
}

.nav-item.active .nav-indicator {
  opacity: 1;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1.25rem 1.5rem 2rem;
  border-top: 1px solid var(--border);
  background: linear-gradient(to bottom, transparent, rgba(248,250,252,0.8));
}

.admin-card {
  background: var(--bg-gradient);
  border: none;
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 20px rgba(99,102,241,0.25);
  position: relative;
  overflow: hidden;
}

.admin-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20%, -20%); }
}

.admin-avatar {
  position: relative;
  z-index: 1;
}

.admin-avatar img {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.3);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.status-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: var(--success);
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.admin-info {
  flex: 1;
  z-index: 1;
}

.admin-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.admin-role {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
}

.user-menu-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  z-index: 1;
}

.user-menu-btn:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-2px);
}

.logout-btn {
  width: 100%;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(239,68,68,0.3);
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(239,68,68,0.4);
}

/* Main Content */
.dashboard-main {
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
}

/* Header */
.main-header {
  background: white;
  border-bottom: 1px solid var(--border);
  padding: 1.5rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
}

.page-title h1 {
  font-size: 1.9rem;
  font-weight: 800;
  background: var(--bg-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Search */
.header-search {
  position: relative;
}

.search-input {
  position: relative;
}

.search-input i {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 1rem;
}

.search-input input {
  width: 350px;
  padding: 0.9rem 1.25rem 0.9rem 3rem;
  border: 2px solid var(--border);
  border-radius: 16px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.search-input input:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
}

.search-input input::placeholder {
  color: var(--text-muted);
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-item {
  position: relative;
  width: 48px;
  height: 48px;
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.action-item:hover {
  background: white;
  color: var(--primary);
  border-color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(99,102,241,0.2);
}

.notification-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.45rem;
  border-radius: 12px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(239,68,68,0.4);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Notification Panel */
.notification-panel {
  position: absolute;
  top: calc(100% + 1rem);
  right: 0;
  width: 380px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.15);
  z-index: 1000;
  overflow: hidden;
}

.panel-header {
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-secondary);
}

.panel-header h4 {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.mark-read-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.mark-read-btn:hover {
  background: rgba(99,102,241,0.1);
}

.notification-list {
  max-height: 350px;
  overflow-y: auto;
}

.notification-item {
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  gap: 1.25rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.notification-item:hover {
  background: var(--bg-secondary);
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-icon {
  width: 42px;
  height: 42px;
  background: var(--bg-gradient);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  font-size: 1.1rem;
  box-shadow: 0 4px 16px rgba(99,102,241,0.25);
}

.notification-content {
  flex: 1;
}

.notification-content p {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
  line-height: 1.5;
}

.notification-time {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Spinning animation */
.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Main Content Area */
.main-content {
  padding: 2.5rem;
  min-height: calc(100vh - var(--header-height));
  background: var(--bg-secondary);
}

/* Sidebar Overlay */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .mobile-menu-toggle {
    display: block;
  }
}
</style>