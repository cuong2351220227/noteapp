<template>
  <div class="settings-view">
    <!-- Header với breadcrumb -->
    <div class="settings-header">
      <div class="header-content">
        <div class="breadcrumb">
          <i class="fas fa-chevron-right"></i>
          <span class="breadcrumb-item active">Cài đặt</span>
        </div>
        <h1 class="page-title">
          <i class="fas fa-cog"></i>
          Cài đặt tài khoản
        </h1>
        <p class="page-subtitle">Quản lý thông tin cá nhân và tùy chọn ứng dụng</p>
      </div>
    </div>

    <div class="settings-container">
      <!-- Sidebar với animation -->
      <div class="settings-sidebar">
        <div class="sidebar-header">
          <h3>Danh mục</h3>
        </div>
        <nav class="sidebar-nav">
          <div 
            v-for="section in settingSections" 
            :key="section.id"
            :class="['nav-item', { active: currentSection === section.id }]"
            @click="selectSection(section.id)"
          >
            <i :class="section.icon"></i>
            <span>{{ section.name }}</span>
            <div class="nav-indicator"></div>
          </div>
        </nav>
      </div>
      
      <!-- Main content với card design -->
      <div class="settings-content">
        <!-- Account Settings Card -->
        <div v-if="currentSection === 'account'" class="settings-card">
          <div class="card-header">
            <div class="header-icon">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="header-text">
              <h2>Thông tin tài khoản</h2>
              <p>Cập nhật thông tin cá nhân và tùy chọn tài khoản</p>
            </div>
          </div>
          
          <div class="card-content">
            <!-- Profile Section -->
            <div class="profile-section">
              <div class="profile-card">
                <div class="profile-avatar">
                  <div class="avatar-container">
                    <img 
                      :src="userProfileImage || '/default-avatar.png'" 
                      alt="Profile" 
                      class="avatar-image"
                    />
                    <div class="avatar-overlay" @click="$refs.profileImageInput.click()">
                      <i class="fas fa-camera"></i>
                      <span>Thay đổi</span>
                    </div>
                    <input 
                      type="file" 
                      ref="profileImageInput" 
                      @change="handleImageChange" 
                      accept="image/jpeg,image/png,image/jpg"
                      style="display: none"
                    />
                  </div>
                  <div class="avatar-info">
                    <h4>{{ settings.fullName || 'Chưa cập nhật' }}</h4>
                    <span class="user-role">Người dùng</span>
                  </div>
                </div>
              </div>

              <!-- Form Fields -->
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-envelope"></i>
                    Email
                  </label>
                  <div class="input-wrapper">
                    <input 
                      type="email" 
                      v-model="settings.email" 
                      :disabled="isLoading"
                      class="form-input"
                      placeholder="Nhập email của bạn"
                    >
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-user"></i>
                    Tên đầy đủ
                  </label>
                  <div class="input-wrapper">
                    <input 
                      type="text" 
                      v-model="settings.fullName" 
                      :disabled="isLoading"
                      class="form-input"
                      placeholder="Nhập tên đầy đủ"
                    >
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-at"></i>
                    Tên người dùng
                  </label>
                  <div class="input-wrapper">
                    <input 
                      type="text" 
                      v-model="settings.username" 
                      :disabled="isLoading"
                      class="form-input"
                      placeholder="Nhập tên người dùng"
                    >
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-calendar-alt"></i>
                    Ngày tham gia
                  </label>
                  <div class="input-wrapper">
                    <input 
                      type="text" 
                      :value="formatDate(settings.createdAt)" 
                      disabled
                      class="form-input readonly"
                    >
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    <i class="fas fa-language"></i>
                    Ngôn ngữ
                  </label>
                  <div class="select-wrapper">
                    <select v-model="settings.language" :disabled="isLoading" class="form-select">
                      <option value="vi">🇻🇳 Tiếng Việt</option>
                      <option value="en">🇺🇸 English</option>
                    </select>
                    <i class="fas fa-chevron-down select-arrow"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Export Section -->
            <div class="export-section">
              <div class="export-card">
                <div class="export-content">
                  <div class="export-icon">
                    <i class="fas fa-file-pdf"></i>
                  </div>
                  <div class="export-text">
                    <h4>Xuất thông tin tài khoản</h4>
                    <p>Tải về file PDF chứa toàn bộ thông tin tài khoản của bạn</p>
                  </div>
                </div>
                <button @click="exportUserData" class="export-button">
                  <i class="fas fa-download"></i>
                  Tải xuống PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Appearance Settings Card -->
        <div v-if="currentSection === 'appearance'" class="settings-card">
          <div class="card-header">
            <div class="header-icon">
              <i class="fas fa-palette"></i>
            </div>
            <div class="header-text">
              <h2>Giao diện</h2>
              <p>Tùy chỉnh giao diện ứng dụng theo sở thích của bạn</p>
            </div>
          </div>
          
          <div class="card-content">
            <div class="appearance-grid">
              <!-- Theme Selection -->
              <div class="theme-section">
                <h4>Chủ đề màu sắc</h4>
                <div class="theme-options">
                  <div 
                    v-for="theme in themeOptions" 
                    :key="theme.value"
                    :class="['theme-option', { active: settings.theme === theme.value }]"
                    @click="settings.theme = theme.value"
                  >
                    <div :class="['theme-preview', theme.value]">
                      <div class="preview-header"></div>
                      <div class="preview-content"></div>
                    </div>
                    <span class="theme-name">{{ theme.name }}</span>
                    <i class="fas fa-check theme-check"></i>
                  </div>
                </div>
              </div>

              <!-- Font Selection -->
              <div class="font-section">
                <h4>Phông chữ</h4>
                <div class="font-options">
                  <div 
                    v-for="font in fontOptions" 
                    :key="font.value"
                    :class="['font-option', { active: settings.font === font.value }]"
                    @click="settings.font = font.value"
                  >
                    <div class="font-preview" :style="{ fontFamily: font.family }">
                      Aa
                    </div>
                    <div class="font-info">
                      <span class="font-name">{{ font.name }}</span>
                      <span class="font-desc">{{ font.description }}</span>
                    </div>
                    <i class="fas fa-check font-check"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Settings Card -->
        <div v-if="currentSection === 'notifications'" class="settings-card">
          <div class="card-header">
            <div class="header-icon">
              <i class="fas fa-bell"></i>
            </div>
            <div class="header-text">
              <h2>Thông báo</h2>
              <p>Quản lý các loại thông báo bạn muốn nhận</p>
            </div>
          </div>
          
          <div class="card-content">
            <div class="notification-options">
              <div class="notification-item">
                <div class="notification-info">
                  <div class="notification-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="notification-text">
                    <h4>Thông báo qua email</h4>
                    <p>Nhận thông báo về hoạt động tài khoản qua email</p>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.emailNotifications">
                  <span class="slider"></span>
                </label>
              </div>

              <div class="notification-item">
                <div class="notification-info">
                  <div class="notification-icon">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="notification-text">
                    <h4>Thông báo đẩy</h4>
                    <p>Nhận thông báo đẩy trực tiếp trên thiết bị</p>
                  </div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.pushNotifications">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-bar">
          <div class="action-buttons">
            <button @click="resetSettings" class="btn-secondary">
              <i class="fas fa-undo"></i>
              Khôi phục mặc định
            </button>
            <button @click="saveSettings" :disabled="isLoading" class="btn-primary">
              <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-save"></i>
              {{ isLoading ? 'Đang lưu...' : 'Lưu thay đổi' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiCall } from '@/config/api';
import { jsPDF } from 'jspdf';
import '@/assets/fonts/DejaVuSans-normal.js';
import '@/assets/fonts/DejaVuSans-Bold-normal.js';

export default {
  name: 'SettingsView',
  data() {
    return {
      currentSection: 'account',
      settingSections: [
        { id: 'account', name: 'Tài khoản', icon: 'fas fa-user-circle' },
        { id: 'appearance', name: 'Giao diện', icon: 'fas fa-palette' },
        { id: 'notifications', name: 'Thông báo', icon: 'fas fa-bell' }
      ],
      themeOptions: [
        { value: 'light', name: 'Sáng', preview: 'light' },
        { value: 'dark', name: 'Tối', preview: 'dark' },
        { value: 'system', name: 'Theo hệ thống', preview: 'auto' }
      ],
      fontOptions: [
        { value: 'sans-serif', name: 'Sans Serif', family: 'system-ui, sans-serif', description: 'Hiện đại, dễ đọc' },
        { value: 'serif', name: 'Serif', family: 'Georgia, serif', description: 'Cổ điển, trang trọng' },
        { value: 'monospace', name: 'Monospace', family: 'Monaco, monospace', description: 'Đều đặn, lập trình' }
      ],
      settings: {
        email: '',
        full_name: '',
        username: '',
        createdAt: null,
        language: 'vi',
        theme: 'light',
        font: 'sans-serif',
        emailNotifications: true,
        pushNotifications: false
      },
      userProfileImage: null,
      isLoading: false
    }
  },
  created() {
    this.loadSettings();
    this.loadUserData();
  },
  watch: {
    'settings.theme': {
      handler(newTheme) {
        this.applyTheme(newTheme);
      },
      immediate: true
    },
    'settings.font': {
      handler(newFont) {
        this.applyFont(newFont);
      },
      immediate: true
    }
  },
  methods: {
    selectSection(sectionId) {
      this.currentSection = sectionId;
    },
    loadSettings() {
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
      }
    },
    async loadUserData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await apiCall('/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 'success') {
          const user = response.data.user;
          this.settings.email = user.email || '';
          this.settings.fullName = user.full_name || '';
          this.settings.username = user.username || '';
          this.settings.createdAt = user.created_at;
          this.userProfileImage = user.profile_image ? `http://localhost:3002${user.profile_image}` : null;
          
          // Cập nhật localStorage
          localStorage.setItem('user', JSON.stringify(user));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Thử lấy từ localStorage nếu API fails
        try {
          const userData = localStorage.getItem('user');
          if (userData) {
            const user = JSON.parse(userData);
            this.settings.email = user.email || '';
            this.settings.fullName = user.full_name || '';
            this.settings.username = user.username || '';
            this.settings.createdAt = user.created_at;
            this.userProfileImage = user.profile_image ? `http://localhost:3002${user.profile_image}` : null;
          }
        } catch (e) {
          console.error('Error loading from localStorage:', e);
        }
      }
    },
    async saveSettings() {
      this.isLoading = true;
      
      try {
        // Validate input data
        if (this.currentSection === 'account') {
          if (!this.settings.email || !this.settings.email.includes('@')) {
            throw new Error('Email không hợp lệ');
          }
          if (!this.settings.fullName || this.settings.fullName.trim().length < 2) {
            throw new Error('Tên hiển thị phải có ít nhất 2 ký tự');
          }
        }
        
        // Save account settings to backend if changed
        if (this.currentSection === 'account') {
          console.log('Updating profile with:', {
            email: this.settings.email,
            fullName: this.settings.fullName
          });
          
          try {
            await this.updateProfile();
            console.log('Profile updated successfully');
          } catch (networkError) {
            console.warn('Backend not available, saving locally only:', networkError);
            // Save to localStorage as fallback
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            userData.email = this.settings.email;
            userData.full_name = this.settings.full_name;
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Dispatch event to update navbar
            window.dispatchEvent(new Event('userUpdated'));
          }
        }
        
        // Save appearance settings to localStorage
        localStorage.setItem('appSettings', JSON.stringify(this.settings));
        this.applyTheme(this.settings.theme);
        this.applyFont(this.settings.font);
        
        window.dispatchEvent(new CustomEvent('settingsChanged', { 
          detail: this.settings 
        }));
        
        this.showSuccessMessage('Đã lưu cài đặt thành công!');
      } catch (error) {
        console.error('Error saving settings:', error);
        this.showErrorMessage('Có lỗi xảy ra khi lưu cài đặt: ' + error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async updateProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Không tìm thấy token xác thực');
        }

        // Lấy userId từ localStorage
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = userData.id;
        
        if (!userId) {
          throw new Error('Không tìm thấy thông tin người dùng');
        }

        const data = await apiCall('/profile', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            email: this.settings.email,
            full_name: this.settings.full_name
          })
        });

        if (data.status === 'success') {
          localStorage.setItem('user', JSON.stringify(data.data.user));
          window.dispatchEvent(new Event('userUpdated'));
          return data;
        } else {
          throw new Error(data.message || 'Cập nhật thất bại');
        }
      } catch (error) {
        console.error('Update profile error:', error);
        throw error;
      }
    },
    applyTheme(theme) {
      const root = document.documentElement;
      root.classList.remove('dark-theme', 'light-theme');
      
      if (theme === 'dark') {
        root.classList.add('dark-theme');
      } else if (theme === 'light') {
        root.classList.add('light-theme');
      } else if (theme === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark-theme');
        } else {
          root.classList.add('light-theme');
        }
      }
    },
    applyFont(font) {
      const root = document.documentElement;
      root.setAttribute('data-font', font);
    },

    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    handleImageChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Tạo preview ảnh
      this.userProfileImage = URL.createObjectURL(file);

      // Tạo FormData để upload
      const formData = new FormData();
      formData.append('profile_image', file);

      this.uploadProfileImage(formData);
    },

    async uploadProfileImage(formData) {
      try {
        this.isLoading = true;
        const token = localStorage.getItem('token');
        
        const response = await apiCall('/profile/image', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (response.status === 'success') {
          this.showSuccessMessage('Cập nhật ảnh đại diện thành công!');
          // Cập nhật ảnh trong localStorage
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          userData.profile_image = response.data.profile_image;
          localStorage.setItem('user', JSON.stringify(userData));
          window.dispatchEvent(new Event('userUpdated'));
        }
      } catch (error) {
        console.error('Upload image error:', error);
        this.showErrorMessage('Có lỗi xảy ra khi tải ảnh lên: ' + error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async exportUserData() {
      try {
        // Tạo instance PDF mới với font UTF-8 để hỗ trợ tiếng Việt
        const doc = new jsPDF({
          unit: 'mm',
          format: 'a4',
          encoding: 'UTF-8'
        });
        
        console.log('Font list:', doc.getFontList());
        // Thiết lập font DejaVuSans cho toàn bộ tài liệu
        doc.setFont('DejaVuSans', 'normal'); // Mặc định dùng normal
        // Dùng bold cho các tiêu đề
        
        // Thêm logo hoặc tiêu đề
        doc.setFontSize(20);
        doc.setTextColor(41, 98, 255);
        doc.text('THÔNG TIN TÀI KHOẢN', 105, 20, { align: 'center' });
        
        // Thêm đường kẻ phân cách
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 25, 190, 25);
        
        // Thiết lập font cho nội dung
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);
        
        // Thêm thông tin người dùng
        const contentY = 40;
        const lineHeight = 10;
        let y = contentY;
        
        // Tạo hàm helper để thêm dòng thông tin
        const addInfoLine = (label, value) => {
      // chuẩn hóa chuỗi sang NFC để tránh dấu tách rời
          const safeLabel = (label || '').normalize('NFC');
          const safeValue = (value || 'Chưa cập nhật').normalize('NFC');

          doc.setFont('DejaVuSans', 'bold');
          doc.text(safeLabel + ':', 20, y);

          doc.setFont('DejaVuSans', 'normal');
          doc.text(safeValue, 70, y);

          y += lineHeight;
        };

        
        // Thêm các dòng thông tin
        addInfoLine("", this.settings.fullName, contentY);
        addInfoLine("",this.settings.email, contentY + lineHeight);
        addInfoLine("", this.settings.username, contentY + lineHeight * 2);
        addInfoLine("", this.formatDate(this.settings.createdAt), contentY + lineHeight * 3);
        addInfoLine("", this.settings.language === 'vi' ? 'Tiếng Việt' : 'English', contentY + lineHeight * 4);
        
        // Thêm ảnh đại diện nếu có
        if (this.userProfileImage) {
          try {
            // Tạo canvas để xử lý ảnh
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = this.userProfileImage;
            });
            
            // Vẽ ảnh vào canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 100;
            canvas.height = 100;
            
            // Vẽ ảnh tròn
            ctx.beginPath();
            ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            
            ctx.drawImage(img, 0, 0, 100, 100);
            
            // Thêm ảnh vào PDF
            const imgData = canvas.toDataURL('image/jpeg');
            doc.addImage(imgData, 'JPEG', 140, contentY - 10, 50, 50);
          } catch (e) {
            console.error('Error adding profile image to PDF:', e);
          }
        }
        
        // Thêm chân trang
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Được tạo vào: ${new Date().toLocaleString('vi-VN')}`,
          105,
          pageHeight - 20,
          { align: 'center' }
        );
        
        // Tạo tên file
        const fileName = `thong-tin-tai-khoan-${this.settings.username}-${new Date().toISOString().split('T')[0]}.pdf`;
        
        // Tải xuống file PDF
        doc.save(fileName);
        
        this.showSuccessMessage('Xuất thông tin PDF thành công!');
      } catch (error) {
        console.error('Export PDF error:', error);
        this.showErrorMessage('Có lỗi xảy ra khi xuất file PDF: ' + error.message);
      }
    },

    resetSettings() {
      if (confirm('Bạn có chắc chắn muốn khôi phục cài đặt về mặc định?')) {
        this.settings = {
          ...this.settings,
          theme: 'light',
          font: 'sans-serif',
          emailNotifications: true,
          pushNotifications: false
        };
        this.saveSettings();
      }
    },

    showSuccessMessage(message) {
      // Có thể thay thế bằng toast notification
      alert(message);
    },

    showErrorMessage(message) {
      // Có thể thay thế bằng toast notification  
      alert(message);
    }
  }
}
</script>

<style scoped>
/* CSS Variables */
:root {
  --primary-color: #667eea;
  --primary-dark: #5a6fd8;
  --secondary-color: #764ba2;
  --success-color: #10b981;
  --danger-color: #f56565;
  --warning-color: #f59e0b;
  --info-color: #3b82f6;
  
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --bg-card: #ffffff;
  
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-tertiary: #94a3b8;
  
  --border-color: #e2e8f0;
  --border-light: #f1f5f9;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  --radius-sm: 6px;
  --radius: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}

/* Dark theme */
.dark-theme {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --bg-card: #1e293b;
  
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  
  --border-color: #334155;
  --border-light: #475569;
}

/* Base Styles */
.settings-view {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
}

.settings-header {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  padding: 2rem 0;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.breadcrumb-item.active {
  color: var(--primary-color);
  font-weight: 500;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Layout */
.settings-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

/* Sidebar */
.settings-sidebar {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  height: fit-content;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  position: sticky;
  top: 2rem;
}

.sidebar-header {
  margin-bottom: 1.5rem;
}

.sidebar-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-secondary);
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  transform: translateX(4px);
}

.nav-item.active {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  box-shadow: var(--shadow);
}

.nav-item.active .nav-indicator {
  opacity: 1;
  transform: scaleX(1);
}

.nav-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--primary-color);
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.nav-item i {
  font-size: 1.125rem;
  width: 20px;
  text-align: center;
}

/* Settings Content */
.settings-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-card {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  overflow: hidden;
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-tertiary) 100%);
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  font-size: 1.25rem;
}

.header-text h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.header-text p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.card-content {
  padding: 2rem;
}

/* Profile Section */
.profile-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.profile-avatar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: var(--shadow);
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 0.75rem;
  gap: 0.25rem;
}

.avatar-overlay:hover {
  opacity: 1;
}

.avatar-overlay i {
  font-size: 1.25rem;
}

.avatar-info h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.user-role {
  font-size: 0.875rem;
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  background: var(--primary-color);
  color: white;
  border-radius: var(--radius);
  font-weight: 500;
}

/* Form Styles */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.form-label i {
  font-size: 1rem;
  color: var(--primary-color);
}

.input-wrapper,
.select-wrapper {
  position: relative;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.readonly {
  background: var(--bg-tertiary);
  cursor: not-allowed;
}

.select-wrapper {
  position: relative;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
  transition: all 0.3s ease;
}

.form-select:focus + .select-arrow {
  color: var(--primary-color);
  transform: translateY(-50%) rotate(180deg);
}

/* Export Section */
.export-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.export-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.export-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.export-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--danger-color);
  color: white;
  border-radius: var(--radius);
  font-size: 1.25rem;
}

.export-text h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.export-text p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.export-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--danger-color);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-button:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* Appearance Settings */
.appearance-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.theme-section,
.font-section {
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.theme-section h4,
.font-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.theme-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: var(--bg-card);
}

.theme-option:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.theme-option.active {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.05);
}

.theme-preview {
  width: 60px;
  height: 40px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.theme-preview.light {
  background: #ffffff;
}

.theme-preview.dark {
  background: #1e293b;
}

.theme-preview.auto {
  background: linear-gradient(90deg, #ffffff 50%, #1e293b 50%);
}

.preview-header {
  height: 30%;
  background: rgba(102, 126, 234, 0.1);
}

.preview-content {
  height: 70%;
  background: inherit;
}

.theme-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.theme-check {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: var(--primary-color);
  opacity: 0;
  transition: all 0.3s ease;
}

.theme-option.active .theme-check {
  opacity: 1;
}

.font-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.font-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-card);
  position: relative;
}

.font-option:hover {
  border-color: var(--primary-color);
  transform: translateX(4px);
}

.font-option.active {
  border-color: var(--primary-color);
  background: rgba(102, 126, 234, 0.05);
}

.font-preview {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  width: 60px;
  text-align: center;
}

.font-info {
  flex: 1;
}

.font-name {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.font-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.font-check {
  color: var(--primary-color);
  opacity: 0;
  transition: all 0.3s ease;
}

.font-option.active .font-check {
  opacity: 1;
}

/* Notification Settings */
.notification-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.notification-item:hover {
  background: var(--bg-secondary);
  transform: translateY(-1px);
}

.notification-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--info-color);
  color: white;
  border-radius: var(--radius);
  font-size: 1rem;
}

.notification-text h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.notification-text p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Action Bar */
.action-bar {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: 1.5rem 2rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  position: sticky;
  bottom: 2rem;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: var(--primary-color, #007bff); /* fallback xanh nếu biến chưa có */
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .settings-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .settings-sidebar {
    position: static;
    order: 2;
  }
  
  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .nav-item {
    white-space: nowrap;
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .settings-container {
    padding: 0 1rem 1rem;
  }
  
  .header-content {
    padding: 0 1rem;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-card {
    flex-direction: column;
    text-align: center;
  }
  
  .export-card {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .theme-options {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5rem;
  }
  
  .theme-options {
    grid-template-columns: 1fr;
  }
  
  .notification-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>