<template>
  <div class="trash-view">
    <h1>Thùng rác</h1>
    <div class="trash-container">
      <div class="trash-header">
        <div class="trash-info">
          <p>Các mục trong thùng rác sẽ bị xóa vĩnh viễn sau 30 ngày</p>
        </div>
        <div class="trash-actions">
          <button 
            @click="restoreSelected" 
            :disabled="!hasSelectedItems"
            class="restore-button"
          >
            Khôi phục đã chọn
          </button>
          <button 
            @click="confirmDeleteSelected" 
            :disabled="!hasSelectedItems"
            class="delete-button"
          >
            Xóa vĩnh viễn
          </button>
        </div>
      </div>

      <div class="trash-items">
        <div class="items-header">
          <label class="checkbox-container">
            <input 
              type="checkbox" 
              :checked="allSelected"
              @change="toggleSelectAll"
            >
            <span class="checkmark"></span>
          </label>
          <span class="name-header">Tên</span>
          <span class="date-header">Đã xóa</span>
          <span class="expires-header">Sẽ bị xóa vĩnh viễn</span>
        </div>

        <div v-for="item in trashItems" :key="item.id" class="trash-item">
          <label class="checkbox-container">
            <input 
              type="checkbox" 
              v-model="item.selected"
              @change="updateSelection"
            >
            <span class="checkmark"></span>
          </label>
          <div class="item-icon">{{ item.icon }}</div>
          <div class="item-name">{{ item.name }}</div>
          <div class="deleted-date">{{ formatDate(item.deletedDate) }}</div>
          <div class="expires-date">{{ formatDate(item.expiresDate) }}</div>
          <div class="item-actions">
            <button @click="restoreItem(item)" class="action-button restore">
              ↩️
            </button>
            <button @click="confirmDeleteItem(item)" class="action-button delete">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrashView',
  data() {
    return {
      trashItems: [
        {
          id: 1,
          name: 'Ghi chú cuộc họp',
          icon: '📝',
          deletedDate: new Date('2023-09-20'),
          expiresDate: new Date('2023-10-20'),
          selected: false
        },
        {
          id: 2,
          name: 'Kế hoạch dự án',
          icon: '📅',
          deletedDate: new Date('2023-09-22'),
          expiresDate: new Date('2023-10-22'),
          selected: false
        },
        {
          id: 3,
          name: 'Danh sách công việc',
          icon: '✅',
          deletedDate: new Date('2023-09-25'),
          expiresDate: new Date('2023-10-25'),
          selected: false
        }
      ]
    }
  },
  computed: {
    hasSelectedItems() {
      return this.trashItems.some(item => item.selected);
    },
    allSelected() {
      return this.trashItems.length > 0 && this.trashItems.every(item => item.selected);
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('vi-VN');
    },
    toggleSelectAll() {
      const newValue = !this.allSelected;
      this.trashItems.forEach(item => {
        item.selected = newValue;
      });
    },
    updateSelection() {
      // Selection state is managed by v-model
    },
    restoreSelected() {
      const selectedItems = this.trashItems.filter(item => item.selected);
      // Add restore logic here
      console.log('Restoring items:', selectedItems);
      this.trashItems = this.trashItems.filter(item => !item.selected);
    },
    confirmDeleteSelected() {
      if (confirm('Bạn có chắc muốn xóa vĩnh viễn các mục đã chọn?')) {
        this.trashItems = this.trashItems.filter(item => !item.selected);
      }
    },
    restoreItem(item) {
      // Add restore logic here
      console.log('Restoring item:', item);
      this.trashItems = this.trashItems.filter(i => i.id !== item.id);
    },
    confirmDeleteItem(item) {
      if (confirm('Bạn có chắc muốn xóa vĩnh viễn mục này?')) {
        this.trashItems = this.trashItems.filter(i => i.id !== item.id);
      }
    }
  }
}
</script>

<style scoped>
.trash-view {
  padding: 20px;
}

.trash-container {
  margin-top: 20px;
}

.trash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 8px;
}

.trash-info {
  color: #64748b;
}

.trash-actions {
  display: flex;
  gap: 10px;
}

.restore-button,
.delete-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.restore-button {
  background-color: #2563eb;
  color: white;
}

.restore-button:hover {
  background-color: #1d4ed8;
}

.delete-button {
  background-color: #dc2626;
  color: white;
}

.delete-button:hover {
  background-color: #b91c1c;
}

button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.items-header {
  display: grid;
  grid-template-columns: 40px 40px 1fr 150px 150px 100px;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8fafc;
  border-radius: 8px 8px 0 0;
  font-weight: 500;
}

.trash-item {
  display: grid;
  grid-template-columns: 40px 40px 1fr 150px 150px 100px;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.trash-item:hover {
  background-color: #f8fafc;
}

.checkbox-container {
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  height: 20px;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #fff;
  border: 2px solid #cbd5e1;
  border-radius: 4px;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: #94a3b8;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #2563eb;
  border-color: #2563eb;
}

.item-icon {
  font-size: 20px;
}

.item-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
}

.action-button:hover {
  background-color: #e2e8f0;
}

.deleted-date,
.expires-date {
  color: #64748b;
}
</style>