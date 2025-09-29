<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Sign Up</h2>
      <p class="subtitle">Start your journey with us today.</p>
      
      <div v-if="errorMessage" class="error-banner">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            v-model="fullName"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email address</label>
          <input 
            type="email" 
            id="email" 
            v-model="email"
            placeholder="name@company.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="username"
            placeholder="Choose your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="profileImage">Profile Image</label>
          <input 
            type="file" 
            id="profileImage" 
            ref="profileImageInput"
            @change="handleImageChange"
            accept="image/jpeg,image/png,image/jpg"
          />
          <div class="image-preview" v-if="imagePreview">
            <img :src="imagePreview" alt="Profile preview" />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password"
            placeholder="••••••••"
            required
            minlength="8"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword"
            placeholder="••••••••"
            required
            minlength="8"
          />
          <span class="error-message" v-if="!passwordsMatch && confirmPassword">
            Passwords do not match
          </span>
        </div>

        <button type="submit" class="register-button">Create Account</button>

        <p class="login-link">
          Already have an account? <a href="#" @click.prevent="goToLogin">Log in here</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'Register',
  setup() {
    const router = useRouter();
    const fullName = ref('');
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const profileImage = ref(null);
    const imagePreview = ref('');
    const profileImageInput = ref(null);
    const errorMessage = ref('');

    const passwordsMatch = computed(() => {
      return !confirmPassword.value || password.value === confirmPassword.value;
    });

    const handleSubmit = async () => {
      try {
        console.log('Starting registration process...');
        // Reset error message
        errorMessage.value = '';

        // Validate passwords match
        if (password.value !== confirmPassword.value) {
          errorMessage.value = 'Passwords do not match';
          return;
        }

        // Validate password length
        if (password.value.length < 8) {
          errorMessage.value = 'Password must be at least 8 characters long';
          return;
        }

        console.log('Sending registration request...');
        // Create FormData object to handle file upload
        const formData = new FormData();
        formData.append('fullName', fullName.value);
        formData.append('email', email.value);
        formData.append('username', username.value);
        formData.append('password', password.value);
        if (profileImage.value) {
          formData.append('profile_image', profileImage.value);
        }

        console.log('Sending registration request...');
        const response = await axios.post('http://localhost:3002/api/auth/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Registration response:', response.data);

        if (response.data.status === 'success') {
          // Registration successful
          const successMessage = document.createElement('div');
          successMessage.className = 'success-banner';
          successMessage.textContent = 'Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập...';
          document.querySelector('.register-form').insertBefore(successMessage, document.querySelector('form'));
          
          // Chờ 2 giây trước khi chuyển hướng
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      } catch (error) {
        if (error.response) {
          // Server responded with an error
          errorMessage.value = error.response.data.message;
        } else if (error.request) {
          // No response received
          errorMessage.value = 'Unable to connect to the server';
        } else {
          // Request error
          errorMessage.value = 'An error occurred while registering';
        }
        console.error('Registration error:', error);
      }
    };

    const goToLogin = () => {
      router.push('/login');
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        profileImage.value = file;
        // Create preview URL
        imagePreview.value = URL.createObjectURL(file);
      }
    };

    return {
      fullName,
      email,
      username,
      password,
      confirmPassword,
      passwordsMatch,
      errorMessage,
      handleSubmit,
      goToLogin,
      profileImageInput,
      imagePreview,
      handleImageChange
    };
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9fafb;
}

.register-form {
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

.register-button {
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

.register-button:hover {
  background-color: #1d4ed8;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #6b7280;
}

.login-link a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

.error-banner {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}

.success-banner {
  background-color: #dcfce7;
  border: 1px solid #bbf7d0;
  color: #15803d;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

input:invalid {
  border-color: #dc2626;
}

input:invalid:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.image-preview {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #d1d5db;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

input[type="file"] {
  padding: 6px;
}

input[type="file"]::-webkit-file-upload-button {
  background-color: #2563eb;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

input[type="file"]::-webkit-file-upload-button:hover {
  background-color: #1d4ed8;
}
</style>