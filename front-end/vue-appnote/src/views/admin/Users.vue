<template>
  <div class="admin-users">
    <div class="users-header">
      <h2>User Management</h2>
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search users..."
          @input="handleSearch"
        >
      </div>
    </div>

    <div class="users-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>
              <div class="user-info">
                <img :src="user.profileImage || '/default-avatar.png'" :alt="user.username">
                <span>{{ user.username }}</span>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <select 
                v-model="user.role"
                @change="handleRoleChange(user)"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td>
              <span :class="['status-badge', user.status]">
                {{ user.status }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button @click="editUser(user)" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="confirmDelete(user)" title="Delete" class="delete">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h3>Edit User</h3>
        <form @submit.prevent="saveUser">
          <div class="form-group">
            <label>Username</label>
            <input type="text" v-model="editingUser.username">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="editingUser.email">
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="editingUser.status">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showEditModal = false">Cancel</button>
            <button type="submit" class="primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminUsers',
  data() {
    return {
      users: [],
      searchQuery: '',
      showEditModal: false,
      editingUser: null
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const searchLower = this.searchQuery.toLowerCase();
        return user.username.toLowerCase().includes(searchLower) ||
               user.email.toLowerCase().includes(searchLower);
      });
    }
  },
  methods: {
    async fetchUsers() {
      try {
        // TODO: Replace with actual API call
        const response = await this.$http.get('/api/admin/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    handleSearch() {
      // Implement debounce if needed
    },
    async handleRoleChange(user) {
      try {
        await this.$http.patch(`/api/admin/users/${user.id}/role`, {
          role: user.role
        });
        // Show success message
      } catch (error) {
        console.error('Error updating role:', error);
        // Revert role change
        user.role = user.originalRole;
      }
    },
    editUser(user) {
      this.editingUser = { ...user };
      this.showEditModal = true;
    },
    async saveUser() {
      try {
        await this.$http.put(`/api/admin/users/${this.editingUser.id}`, this.editingUser);
        const index = this.users.findIndex(u => u.id === this.editingUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.editingUser };
        }
        this.showEditModal = false;
      } catch (error) {
        console.error('Error saving user:', error);
      }
    },
    async confirmDelete(user) {
      if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
        try {
          await this.$http.delete(`/api/admin/users/${user.id}`);
          this.users = this.users.filter(u => u.id !== user.id);
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    }
  },
  mounted() {
    // Temporary mock data
    this.users = [
      {
        id: 1,
        username: 'johndoe',
        email: 'john@example.com',
        role: 'user',
        status: 'active',
        profileImage: null
      },
      {
        id: 2,
        username: 'janedoe',
        email: 'jane@example.com',
        role: 'admin',
        status: 'active',
        profileImage: null
      },
      {
        id: 3,
        username: 'bobsmith',
        email: 'bob@example.com',
        role: 'user',
        status: 'inactive',
        profileImage: null
      }
    ];
  }
}
</script>

<style scoped>
.admin-users {
  padding: 20px;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.users-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.status-badge.active {
  background-color: #e3fcef;
  color: #00875a;
}

.status-badge.inactive {
  background-color: #fff0e6;
  color: #b65c02;
}

.status-badge.suspended {
  background-color: #ffebe6;
  color: #bf2600;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons button {
  padding: 6px;
  border: none;
  border-radius: 4px;
  background: #f0f0f0;
  cursor: pointer;
}

.action-buttons button:hover {
  background: #e0e0e0;
}

.action-buttons button.delete {
  color: #dc3545;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-actions button.primary {
  background: #3498db;
  color: white;
}

select {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}
</style>