<template>
  <div class="inbox-view">
    <h1>Hộp thư đến</h1>
    <div class="inbox-list" v-if="messages.length > 0">
      <div v-for="message in messages" :key="message.id" class="message-item">
        <div class="message-header">
          <span class="sender">{{ message.sender }}</span>
          <span class="date">{{ message.date }}</span>
        </div>
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
    <div v-else class="empty-inbox">
      <p>Không có tin nhắn mới</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InboxView',
  data() {
    return {
      messages: []
    }
  }
}
</script>

<style scoped>
.inbox-view {
  padding: 20px;
}

.inbox-list {
  margin-top: 20px;
}

.message-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.sender {
  font-weight: bold;
}

.date {
  color: #666;
}

.empty-inbox {
  text-align: center;
  color: #666;
  margin-top: 40px;
}
</style>