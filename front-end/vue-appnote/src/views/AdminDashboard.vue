<template>
    <div class="admin-dashboard">
        <!-- Sidebar -->
        <div class="dashboard-sidebar">
            <div class="sidebar-header">
                <img src="@/assets/logo.png" alt="Logo" class="logo">
                <h2>Admin Dashboard</h2>
            </div>
            
            <nav class="sidebar-nav">
                <router-link 
                    v-for="item in menuItems" 
                    :key="item.path"
                    :to="item.path"
                    class="nav-item"
                    :class="{ active: currentRoute === item.path }"
                >
                    <i :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                </router-link>
            </nav>

            <div class="sidebar-footer">
                <div class="admin-info">
                    <img :src="adminAvatar" alt="Admin" class="admin-avatar">
                    <div class="admin-details">
                        <span class="admin-name">{{ adminName }}</span>
                        <span class="admin-role">Administrator</span>
                    </div>
                </div>
                <button @click="logout" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    Đăng xuất
                </button>
            </div>
        </div>

        <!-- Main Content -->
        <div class="dashboard-main">
            <div class="main-header">
                <div class="header-search">
                    <i class="fas fa-search"></i>
                    <input 
                        type="text" 
                        v-model="searchQuery"
                        placeholder="Tìm kiếm..."
                        @input="handleSearch"
                    >
                </div>
                
                <div class="header-actions">
                    <div class="notification-bell" @click="toggleNotifications">
                        <i class="fas fa-bell"></i>
                        <span v-if="notifications.length" class="notification-badge">
                            {{ notifications.length }}
                        </span>
                    </div>
                    
                    <div class="quick-actions">
                        <button class="action-btn" @click="refreshData">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                        <button class="action-btn" @click="openSettings">
                            <i class="fas fa-cog"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
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
    
    const searchQuery = ref('');
    const notifications = ref([]);
    const adminAvatar = ref('/default-avatar.png');
    const adminName = ref('');

    const menuItems = [
      {
        name: 'Tổng quan',
        path: '/admin',
        icon: 'fas fa-home'
      },
      {
        name: 'Quản lý người dùng',
        path: '/admin/users',
        icon: 'fas fa-users'
      },
      {
        name: 'Thống kê',
        path: '/admin/statistics',
        icon: 'fas fa-chart-bar'
      },
      {
        name: 'Cài đặt hệ thống',
        path: '/admin/settings',
        icon: 'fas fa-cogs'
      }
    ];

    const currentRoute = computed(() => route.path);

    onMounted(async () => {
      try {
        // Load admin info
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          adminName.value = user.full_name || user.username;
          if (user.profile_image) {
            adminAvatar.value = `http://localhost:3002${user.profile_image}`;
          }
        }

        // Load notifications
        await loadNotifications();
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    });

    const loadNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3002/api/admin/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          notifications.value = data.notifications;
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    const handleSearch = () => {
      // Implement search functionality
      console.log('Searching for:', searchQuery.value);
    };

    const toggleNotifications = () => {
      // Implement notifications panel toggle
      console.log('Toggle notifications');
    };

    const refreshData = async () => {
      try {
        await loadNotifications();
        // Refresh other data as needed
      } catch (error) {
        console.error('Error refreshing data:', error);
      }
    };

    const openSettings = () => {
      router.push('/admin/settings');
    };

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    };

    return {
      searchQuery,
      notifications,
      menuItems,
      currentRoute,
      adminAvatar,
      adminName,
      handleSearch,
      toggleNotifications,
      refreshData,
      openSettings,
      logout
    };
  }
};
</script>

<style scoped>
/* CSS Variables */
:root {
  --primary-color: #667eea;
  --primary-dark: #5a67d8;
  --secondary-color: #4c51bf;
  --success-color: #48bb78;
  --warning-color: #ecc94b;
  --danger-color: #e53e3e;
  
  --bg-primary: #f7fafc;
  --bg-secondary: #fff;
  --bg-dark: #2d3748;
  
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #a0aec0;
  
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.admin-dashboard {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Sidebar Styles */
.dashboard-sidebar {
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  position: fixed;
  width: 280px;
  height: 100vh;
  box-shadow: var(--shadow);
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1.5rem;
}

.logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.sidebar-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background: var(--bg-primary);
  color: var(--primary-color);
}

.nav-item.active {
  background: var(--primary-color);
  color: white;
}

.nav-item i {
  width: 1.5rem;
  text-align: center;
}

.sidebar-footer {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.admin-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.admin-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.admin-details {
  display: flex;
  flex-direction: column;
}

.admin-name {
  font-weight: 600;
  color: var(--text-primary);
}

.admin-role {
  font-size: 0.875rem;
  color: var(--text-light);
}

.logout-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--danger-color);
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #c53030;
}

/* Main Content Styles */
.dashboard-main {
  margin-left: 280px;
  padding: 1.5rem;
}

.main-header {
  background: var(--bg-secondary);
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.header-search {
  position: relative;
  width: 300px;
}

.header-search i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.header-search input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.header-search input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-bell {
  position: relative;
  padding: 0.5rem;
  cursor: pointer;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--danger-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 1rem;
}

.quick-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: var(--bg-primary);
  color: var(--primary-color);
}

.main-content {
  background: var(--bg-secondary);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .admin-dashboard {
    grid-template-columns: 1fr;
  }
  
  .dashboard-sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .dashboard-sidebar.open {
    transform: translateX(0);
  }
  
  .dashboard-main {
    margin-left: 0;
  }
  
  .header-search {
    width: 200px;
  }
}

@media (max-width: 640px) {
  .main-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-search {
    width: 100%;
  }
}
</style>