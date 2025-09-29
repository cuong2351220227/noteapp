<template>
  <div class="new-page-view">
    <h1>Tạo trang mới</h1>
    <div class="template-section">
      <h2>Chọn mẫu</h2>
      <div class="template-grid">
        <div v-for="template in templates" :key="template.id" class="template-card" @click="selectTemplate(template)">
          <div class="template-icon">{{ template.icon }}</div>
          <div class="template-info">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPageView',
  data() {
    return {
      templates: [
        {
          id: 1,
          icon: '📝',
          name: 'Trang trống',
          description: 'Bắt đầu với một trang trống'
        },
        {
          id: 2,
          icon: '📅',
          name: 'Lịch trình',
          description: 'Quản lý thời gian và sự kiện'
        },
        {
          id: 3,
          icon: '📚',
          name: 'Ghi chú',
          description: 'Tổ chức ghi chú của bạn'
        },
        {
          id: 4,
          icon: '✅',
          name: 'Danh sách việc cần làm',
          description: 'Theo dõi công việc của bạn'
        }
      ]
    }
  },
  methods: {
    selectTemplate(template) {
      console.log('Selected template:', template.name);
      // Add logic to create new page from template
    }
  }
}
</script>

<style scoped>
.new-page-view {
  padding: 20px;
}

.template-section {
  margin-top: 20px;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.template-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.template-card:hover {
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.template-icon {
  font-size: 24px;
  margin-right: 15px;
}

.template-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.template-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>