<template>
  <div class="collaboration-view">
    <h1>Bắt đầu cộng tác</h1>
    <div class="collaboration-container">
      <div class="share-section">
        <h2>Mời đồng nghiệp</h2>
        <div class="invite-form">
          <input 
            type="email" 
            v-model="email" 
            placeholder="Nhập email người dùng"
          >
          <select v-model="permission">
            <option value="edit">Có thể chỉnh sửa</option>
            <option value="comment">Chỉ có thể bình luận</option>
            <option value="view">Chỉ có thể xem</option>
          </select>
          <button @click="inviteUser" class="invite-button">Mời</button>
        </div>
      </div>

      <div class="shared-with-section">
        <h2>Đã chia sẻ với</h2>
        <div class="users-list">
          <div v-for="user in sharedUsers" :key="user.id" class="user-item">
            <div class="user-info">
              <span class="user-avatar">{{ user.avatar }}</span>
              <span class="user-email">{{ user.email }}</span>
            </div>
            <div class="user-permission">
              <select v-model="user.permission" @change="updatePermission(user)">
                <option value="edit">Có thể chỉnh sửa</option>
                <option value="comment">Chỉ có thể bình luận</option>
                <option value="view">Chỉ có thể xem</option>
              </select>
              <button @click="removeUser(user.id)" class="remove-button">✕</button>
            </div>
          </div>
        </div>
      </div>

      <div class="link-sharing">
        <h2>Chia sẻ liên kết</h2>
        <div class="link-container">
          <input 
            type="text" 
            :value="sharingLink" 
            readonly
          >
          <button @click="copyLink" class="copy-button">Sao chép</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollaborationView',
  data() {
    return {
      email: '',
      permission: 'edit',
      sharingLink: 'https://your-domain.com/share/abc123',
      sharedUsers: [
        { id: 1, email: 'user1@example.com', permission: 'edit', avatar: '👤' },
        { id: 2, email: 'user2@example.com', permission: 'comment', avatar: '👤' }
      ]
    }
  },
  methods: {
    inviteUser() {
      if (this.email && this.isValidEmail(this.email)) {
        this.sharedUsers.push({
          id: Date.now(),
          email: this.email,
          permission: this.permission,
          avatar: '👤'
        });
        this.email = '';
      }
    },
    updatePermission(user) {
      console.log(`Updated ${user.email}'s permission to ${user.permission}`);
    },
    removeUser(id) {
      this.sharedUsers = this.sharedUsers.filter(user => user.id !== id);
    },
    copyLink() {
      navigator.clipboard.writeText(this.sharingLink)
        .then(() => alert('Đã sao chép liên kết!'))
        .catch(() => alert('Không thể sao chép liên kết'));
    },
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }
}
</script>

<style scoped>
.collaboration-view {
  padding: 20px;
}

.collaboration-container {
  max-width: 800px;
  margin: 0 auto;
}

.share-section,
.shared-with-section,
.link-sharing {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.invite-form {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.invite-form input,
.invite-form select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.invite-form input {
  flex: 2;
}

.invite-form select {
  flex: 1;
}

.invite-button,
.copy-button {
  padding: 8px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.invite-button:hover,
.copy-button:hover {
  background-color: #1d4ed8;
}

.users-list {
  margin-top: 15px;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  font-size: 20px;
}

.user-permission {
  display: flex;
  align-items: center;
  gap: 10px;
}

.remove-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 5px;
}

.remove-button:hover {
  color: #dc2626;
}

.link-container {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.link-container input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
}
</style>