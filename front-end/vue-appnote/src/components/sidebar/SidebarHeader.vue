<template>
  <div class="sidebar-header">
    <div class="header-item">
      <span class="icon">N</span>
      <span class="text">{{ displayName }}</span>
      <span class="icon edit-icon">📝</span>
      <span class="icon arrow-down-icon">🔽</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarHeader',
  data() {
    return {
      user: null
    }
  },
  computed: {
    displayName() {
      if (this.user) {
        return `Notion của ${this.user.username}...`;
      }
      return 'Notion chưa được đăng nhập'; // fallback
    }
  },
  created() {
    this.loadUserInfo();
    // Listen for login events
    window.addEventListener('userLoggedIn', this.loadUserInfo);
    window.addEventListener('storage', this.loadUserInfo);
  },
  beforeDestroy() {
    window.removeEventListener('userLoggedIn', this.loadUserInfo);
    window.removeEventListener('storage', this.loadUserInfo);
  },
  methods: {
    loadUserInfo() {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
        } else {
          this.user = null;
        }
      } catch (e) {
        console.error('Error loading user info:', e);
        this.user = null;
      }
    }
  }
}
</script>

<style scoped>
.sidebar-header {
  margin-bottom: 10px;
}

.header-item {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 3px;
  margin: 0 10px;
  transition: background-color 0.2s;
}

.header-item:hover {
  background-color: #e0e0e0;
}

.icon {
  font-size: 18px;
  margin-right: 10px;
  color: #666;
  width: 20px;
  text-align: center;
}

.header-item .icon {
  font-size: 16px;
}

.header-item .text {
  flex-grow: 1;
}

.edit-icon,
.arrow-down-icon {
  font-size: 14px;
  margin-left: 5px;
  margin-right: 0;
  color: #999;
}
</style>
