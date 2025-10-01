<template>
  <div class="admin-page">
    <div class="header">
      <h1>🔧 Admin Dashboard</h1>
      <router-link to="/home" class="back-link">← Quay lại</router-link>
    </div>
    
    <div class="content">
      <div class="stats">
        <div class="stat-item">
          <h3>1,247</h3>
          <p>Người dùng</p>
        </div>
        <div class="stat-item">
          <h3>8,942</h3>
          <p>Ghi chú</p>
        </div>
        <div class="stat-item">
          <h3>2.4 GB</h3>
          <p>Dung lượng</p>
        </div>
      </div>

      <div class="section">
        <h2>Hoạt động gần đây</h2>
        <div class="activity">
          <p>• Người dùng mới: john.doe@email.com (5 phút trước)</p>
          <p>• Ghi chú mới được tạo (12 phút trước)</p>
          <p>• Backup hoàn thành (1 giờ trước)</p>
        </div>
      </div>

      <div class="section">
        <h2>Thao tác</h2>
        <div class="actions">
          <button @click="doAction('Export')">Export</button>
          <button @click="doAction('Backup')">Backup</button>
          <button @click="doAction('Logs')">Logs</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  methods: {
    doAction(name) {
      alert(`Thao tác: ${name}`);
    }
  }
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.back-link {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-item h3 {
  font-size: 2rem;
  color: #007bff;
  margin: 0 0 0.5rem 0;
}

.section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.activity p {
  margin: 0.5rem 0;
}

.actions button {
  margin: 0.5rem 0.5rem 0.5rem 0;
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:hover {
  background: #0056b3;
}
</style>