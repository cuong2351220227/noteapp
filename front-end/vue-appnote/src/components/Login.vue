<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <p class="subtitle">Welcome back! Please login to your account.</p>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password"
            placeholder="••••••••"
            required
          />
          <a href="#" class="forgot-password" @click.prevent="forgotPassword">
            Forgot Password?
          </a>
        </div>

        <button type="submit" class="login-button">Log In</button>

        <p class="register-link">
          Don't have an account? <router-link to="/register">Sign up here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.errorMessage = '';
        console.log('Attempting login with:', { username: this.username });
        
        const response = await fetch('http://localhost:3002/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          }),
          credentials: 'include'
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
          // Kiểm tra token và thông tin user
          if (!data.token || !data.user) {
            throw new Error('Invalid response data');
          }

          // Lưu token và thông tin user vào localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          console.log('Login successful:', {
            token: data.token ? 'Present' : 'Missing',
            user: data.user
          });
          
          // Phát sự kiện để navbar cập nhật ngay lập tức
          window.dispatchEvent(new Event('userLoggedIn'));
          
          if (data.user.role === 'admin') {
            this.$router.push('/admin/dashboard');
          } else {
            this.$router.push('/home');
          }
        } else {
          console.error('Login failed:', data);
          this.errorMessage = data.message || 'Đăng nhập thất bại';
        }
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = error.message || 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.';
      }
    },
    forgotPassword() {
      // Xử lý quên mật khẩu
      console.log('Forgot password clicked')
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9fafb;
}

.login-form {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  color: #111827;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}

.subtitle {
  color: #6b7280;
  text-align: center;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

label {
  display: block;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.forgot-password {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
  color: #2563eb;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #1d4ed8;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #6b7280;
}

.register-link a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
}
</style>
