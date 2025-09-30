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
                        <span>Dashboard</span>
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
                        <div class="search-suggestions" v-if="searchFocused && searchQuery">
                            <!-- Search suggestions would go here -->
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
                            <div class="notification-panel" v-if="showNotifications">
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
import { ref, computed, onMounted, watch } from 'vue';
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
      { name: 'Tổng quan', path: '/admin', icon: 'fas fa-home' },
      { name: 'Analytics', path: '/admin/analytics', icon: 'fas fa-chart-line' },
      { name: 'Thông báo', path: '/admin/notifications', icon: 'fas fa-bell' }
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
        '/admin': 'Xem tổng quan hệ thống',
        '/admin/users': 'Quản lý người dùng hệ thống',
        '/admin/analytics': 'Phân tích dữ liệu',
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
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    };

    const loadNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3002/api/admin/notifications', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
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
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          adminName.value = user.full_name || user.username;
          if (user.profile_image) {
            adminAvatar.value = `http://localhost:3002${user.profile_image}`;
          }
        }
        await loadNotifications();
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    });

    // Handle click outside notifications
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-bell')) {
        showNotifications.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
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
/* CSS Variables */
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
  --bg-overlay: rgba(0, 0, 0, 0.5);
  
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --text-inverse: #ffffff;
  
  --border: #e2e8f0;
  --border-light: #f1f5f9;
  
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  
  --sidebar-width: 280px;
  --header-height: 80px;
}

/* Dark theme variables */
:root.dark-theme {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted: #64748b;
  --border: #334155;
  --border-light: #475569;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0.75rem;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  color: var(--text-primary);
}

/* Dashboard Layout */
.admin-dashboard {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.dashboard-sidebar {
  width: var(--sidebar-width);
  background: var(--bg-primary);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-header {
  padding: 2rem 1.5rem 1.5rem;
  border-bottom: 1px solid var(--border-light);
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-logo .logo-circle {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.brand-text h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.125rem;
}

.brand-text span {
  font-size: 0.875rem;
  color: var(--text-muted);
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 1.5rem 1rem;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover {
  background: var(--bg-secondary);
  color: var(--primary);
  transform: translateX(4px);
}

.nav-item.active {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: white;
  box-shadow: var(--shadow-md);
}

.nav-item.active .nav-indicator {
  opacity: 1;
}

.nav-icon {
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  flex: 1;
}

.nav-indicator {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1rem 1.5rem 2rem;
  border-top: 1px solid var(--border-light);
}

.admin-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-avatar {
  position: relative;
}

.admin-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: var(--success);
  border: 2px solid var(--bg-primary);
  border-radius: 50%;
}

.admin-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.admin-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.admin-role {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.user-menu-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.user-menu-btn:hover {
  background: var(--bg-tertiary);
  color: var(--primary);
}

.logout-btn {
  width: 100%;
  background: var(--danger);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

/* Main Content */
.dashboard-main {
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  background: var(--bg-secondary);
}

/* Header */
.main-header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
}

.header-left .page-title h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: var(--text-muted);
  font-size: 0.875rem;
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
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 0.875rem;
}

.search-input input {
  width: 300px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.search-input input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  background: var(--bg-primary);
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-item {
  position: relative;
  width: 44px;
  height: 44px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-item:hover {
  background: var(--bg-primary);
  color: var(--primary);
  transform: translateY(-1px);
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--danger);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Notification Panel */
.notification-panel {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 350px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  z-index: 1000;
}

.panel-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-header h4 {
  font-weight: 600;
  color: var(--text-primary);
}

.mark-read-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.mark-read-btn:hover {
  background: var(--bg-secondary);
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  gap: 1rem;
  transition: all 0.2s ease;
}

.notification-item:hover {
  background: var(--bg-secondary);
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-icon {
  width: 36px;
  height: 36px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}

.notification-content p {
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.notification-time {
  font-size: 0.75rem;
  color: var(--text-muted);
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
  padding: 2rem;
  min-height: calc(100vh - var(--header-height));
}

/* Sidebar Overlay */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-overlay);
  z-index: 999;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .dashboard-sidebar {
    transform: translateX(-100%);
  }
  
  .dashboard-sidebar.sidebar-open {
    transform: translateX(0);
  }
  
  .dashboard-main {
    margin-left: 0;
  }
  
  .main-header {
    padding: 1rem 1.5rem 1rem 4.5rem;
  }
  
  .sidebar-overlay {
    display: block;
  }
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    gap: 1rem;
    height: auto;
    padding: 1rem 1.5rem 1rem 4.5rem;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .search-input input {
    width: 200px;
  }
  
  .notification-panel {
    width: 300px;
  }
  
  .main-content {
    padding: 1rem;
  }
}

@media (max-width: 640px) {
  .search-input input {
    width: 150px;
  }
  
  .notification-panel {
    width: 280px;
  }
  
  .header-actions .action-item {
    width: 40px;
    height: 40px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .spinning {
    animation: none;
  }
  
  .nav-item:hover,
  .action-item:hover,
  .logout-btn:hover {
    transform: none;
  }
}

/* Focus styles */
.nav-item:focus,
.action-item:focus,
.logout-btn:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
</style>