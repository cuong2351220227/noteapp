<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="logo">
        <img :src="logo" alt="Notion Logo">
      </router-link>
    </div>
    <ul class="navbar-menu">
      <li v-for="item in navItems" :key="item.name" class="navbar-item">
        <a @click="handleNavClick(item)" class="navbar-link" href="#">{{ item.name }}</a>
      </li>
    </ul>
    <div class="navbar-actions">
      <template v-if="!isLoggedIn">
        <router-link to="/login" class="navbar-action-link">Đăng nhập</router-link>
        <router-link to="/register" class="navbar-action-button">Đăng ký</router-link>
      </template>
      <template v-else>
        <span class="user-account">{{ username }}</span>
        <button @click="logout" class="navbar-action-button">Đăng xuất</button>
      </template>
    </div>
  </nav>
</template>

<script>
import logo from '../assets/logo.png'

export default {
  name: 'Navbar',
  data() {
    return {
      logo,
      navItems: [
        { name: 'Notion', link: '/home' },
        { name: 'Mail', link: '/inbox' },
        { name: 'Lịch', link: '#' },
        { name: 'AI', link: '#' },
        { name: 'Enterprise', link: '#' },
        { name: 'Giá', link: '#' },
        { name: 'Khám Phá', link: '#' },
        { name: 'Bản demo', link: '#' },
      ],
      isLoggedIn: false,
      username: ''
    };
  },
  created() {
    // Kiểm tra trạng thái đăng nhập khi component được tạo
    this.checkLoginStatus();
    // Lắng nghe sự kiện storage để cập nhật khi có thay đổi đăng nhập từ tab khác
    window.addEventListener('storage', this.checkLoginStatus);
    // Lắng nghe sự kiện đăng nhập thành công
    window.addEventListener('userLoggedIn', this.checkLoginStatus);
  },
  beforeDestroy() {
    // Xóa event listener khi component bị hủy
    window.removeEventListener('storage', this.checkLoginStatus);
    window.removeEventListener('userLoggedIn', this.checkLoginStatus);
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        try {
          const userData = JSON.parse(user);
          this.isLoggedIn = true;
          this.username = userData.username;
          console.log('Login status updated:', userData.username);
        } catch (e) {
          console.error('Error parsing user data:', e);
          this.isLoggedIn = false;
          this.username = '';
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        this.isLoggedIn = false;
        this.username = '';
      }
    },
    handleNavClick(item) {
      if (!this.isLoggedIn) {
        this.$router.push('/login');
      } else {
        if (item.link !== '#') {
          this.$router.push(item.link);
        }
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.username = '';
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.navbar-brand .logo img {
  height: 24px; /* Adjust as needed */
  width: auto;
}

.navbar-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-item {
  margin-left: 40px;
}

.navbar-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 5px 0;
  transition: color 0.3s ease;
}

.navbar-link:hover {
  color: #007bff; /* Example hover color */
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.navbar-action-link {
  text-decoration: none;
  color: #333;
  margin-right: 20px;
  font-weight: 500;
}

.navbar-action-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.navbar-action-button:hover {
  background-color: #0056b3;
}

.user-account {
  margin-right: 20px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
}
</style>
