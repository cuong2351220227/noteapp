<template>
  <div class="notion-ai-page">
    <div class="header">
      <span class="personalize">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C13.66 4 15 5.34 15 7C15 8.66 13.66 10 12 10C10.34 10 9 8.66 9 7C9 5.34 10.34 4 12 4ZM12 20C9.66 20 7.41 18.84 6 17C6 15.11 9.94 13.5 12 13.5C14.06 13.5 18 15.11 18 17C16.59 18.84 14.34 20 12 20Z" fill="currentColor"/>
        </svg>
        Cá nhân hóa
      </span>
    </div>
    <div class="content">
      <div class="ai-logo">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C13.66 4 15 5.34 15 7C15 8.66 13.66 10 12 10C10.34 10 9 8.66 9 7C9 5.34 10.34 4 12 4ZM12 20C9.66 20 7.41 18.84 6 17C6 15.11 9.94 13.5 12 13.5C14.06 13.5 18 15.11 18 17C16.59 18.84 14.34 20 12 20Z" fill="currentColor"/>
        </svg>
      </div>
      <h2>Hôm nay tôi có thể giúp gì cho bạn?</h2>
      <div class="search-box-wrapper">
        <div class="search-box">
          <div class="context-button">
            <span class="icon">@</span> Thêm ngữ cảnh
          </div>
          <textarea v-model="userInput" placeholder="Hỏi, tìm kiếm hoặc tạo bất kỳ nội dung nào..."></textarea>
          <button @click="sendMessage" class="send-btn">Gửi</button>
          <div class="chat-history" v-if="messages.length > 0">
            <div v-for="(msg, i) in messages" :key="i" class="chat-msg">
              <div class="message-wrapper" :class="{ 'user-message': msg.sender === 'Bạn', 'ai-message': msg.sender === 'AI', 'system-message': msg.sender === 'Hệ thống' }">
                <div class="message-avatar">
                  <span v-if="msg.sender === 'Bạn'">👤</span>
                  <span v-else-if="msg.sender === 'AI'">🤖</span>
                  <span v-else>⚠️</span>
                </div>
                <div class="message-content">
                  <div class="message-sender">{{ msg.sender }}</div>
                  <div class="message-text">{{ msg.text }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="search-options">
            <button><span class="icon">💡</span> Tự động</button>
            <button><span class="icon">🔍</span> Nghiên cứu</button>
            <button><span class="icon">🌐</span> Tất cả nguồn</button>
            <button class="upload-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L12 6L7 11H10V16H14V11H17Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotionAIClone',
  data() {
    return {
      userInput: "",
      reply: "",
      messages: []
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      // Thêm tin nhắn của người dùng vào lịch sử
      this.messages.push({
        sender: "Bạn",
        text: this.userInput
      });

      try {
        const res = await fetch("http://localhost:3002/chat", {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: this.userInput }),
        });
        const data = await res.json();
        
        // Thêm câu trả lời từ AI vào lịch sử
        this.messages.push({
          sender: "AI",
          text: data.reply
        });
        
        // Xóa nội dung input sau khi gửi
        this.userInput = "";
      } catch (err) {
        console.error("Lỗi:", err);
        // Thông báo lỗi cho người dùng
        this.messages.push({
          sender: "Hệ thống",
          text: "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau."
        });
      }
    }
  }
}
</script>

<style scoped>
.notion-ai-page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  position: relative;
  overflow-x: hidden;
}

.notion-ai-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(79, 172, 254, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
}

.personalize {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.3s ease;
}

.personalize:hover {
  background: rgba(241, 245, 249, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.personalize svg {
  width: 16px;
  height: 16px;
  color: #667eea;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
  position: relative;
  z-index: 2;
}

.ai-logo {
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.ai-logo svg {
  width: 48px;
  height: 48px;
  color: white;
}

h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  color: #1f2937;
  text-shadow: none;
  letter-spacing: -0.02em;
}

.search-box-wrapper {
  width: 100%;
  max-width: 720px;
  padding: 0 20px;
  box-sizing: border-box;
}

.search-box {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.search-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
}

.context-button {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 13px;
  color: white;
  margin-bottom: 16px;
  cursor: pointer;
  width: fit-content;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.context-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.context-button .icon {
  font-weight: bold;
  margin-right: 8px;
  font-size: 14px;
}

textarea {
  width: 100%;
  border: none;
  background: transparent;
  resize: none;
  font-size: 16px;
  padding: 12px 0;
  margin-bottom: 16px;
  outline: none;
  color: #333;
  min-height: 50px;
  line-height: 1.5;
  font-family: inherit;
}

textarea::placeholder {
  color: #999;
}

.send-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  align-self: flex-end;
  margin-bottom: 16px;
}

.send-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.send-btn:active {
  transform: translateY(0);
}

.chat-history {
  margin-top: 20px;
  width: 100%;
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 16px;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.chat-history::-webkit-scrollbar {
  width: 6px;
}

.chat-history::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 3px;
}

.chat-history::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 3px;
}

.chat-msg {
  margin-bottom: 16px;
}

.chat-msg:last-child {
  margin-bottom: 0;
}

/* Message Wrapper - Base */
.message-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.message-wrapper:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* User Message - Right aligned */
.user-message {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.user-message .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px 4px 16px 16px;
  padding: 12px 16px;
  text-align: left; /* Keep text left-aligned even in right-side messages */
  max-width: 70%;
}

/* AI Message - Left aligned */
.ai-message {
  flex-direction: row;
  justify-content: flex-start;
}

.ai-message .message-content {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border-radius: 4px 16px 16px 16px;
  padding: 12px 16px;
  text-align: left;
  max-width: 70%;
}

/* System Message - Center aligned */
.system-message {
  flex-direction: row;
  justify-content: center;
}

.system-message .message-content {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #8b4513;
  border-radius: 12px;
  padding: 12px 16px;
  text-align: center;
  max-width: 80%;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.message-sender {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  opacity: 0.8;
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.search-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(226, 232, 240, 0.6);
  padding-top: 16px;
  margin-top: 8px;
}

.search-options button {
  background: transparent;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.search-options button:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  transform: translateY(-1px);
}

.search-options button .icon {
  font-size: 14px;
}

.search-options .upload-button {
  background: rgba(102, 126, 234, 0.1);
  border: none;
  padding: 10px;
  border-radius: 12px;
  margin-left: auto;
  transition: all 0.3s ease;
}

.search-options .upload-button:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-1px);
}

.search-options .upload-button svg {
  width: 18px;
  height: 18px;
  color: #667eea;
}

/* Responsive design */
@media (max-width: 768px) {
  .search-box-wrapper {
    max-width: 90%;
  }
  
  h2 {
    font-size: 28px;
  }
  
  .search-box {
    padding: 20px;
  }
  
  .user-message .message-content,
  .ai-message .message-content {
    max-width: 85%;
  }
  
  .system-message .message-content {
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .message-wrapper {
    padding: 8px;
  }
  
  .user-message .message-content,
  .ai-message .message-content,
  .system-message .message-content {
    max-width: 90%;
  }
}
</style>
