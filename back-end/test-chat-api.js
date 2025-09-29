const axios = require('axios');

// Test chat API
async function testChatAPI() {
  console.log('🧪 Bắt đầu test Chat API...\n');

  try {
    // Test 1: Gửi tin nhắn đơn giản
    console.log('📤 Test 1: Gửi tin nhắn "Xin chào"');
    const response1 = await axios.post('http://localhost:3002/chat', {
      message: 'Xin chào'
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Status:', response1.status);
    console.log('✅ Response:', response1.data);
    console.log('---\n');

    // Test 2: Gửi tin nhắn dài
    console.log('📤 Test 2: Gửi tin nhắn dài');
    const response2 = await axios.post('http://localhost:3002/chat', {
      message: 'Bạn có thể giúp tôi giải thích về lập trình JavaScript không?'
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Status:', response2.status);
    console.log('✅ Response:', response2.data);
    console.log('---\n');

    // Test 3: Gửi tin nhắn rỗng
    console.log('📤 Test 3: Gửi tin nhắn rỗng');
    const response3 = await axios.post('http://localhost:3002/chat', {
      message: ''
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Status:', response3.status);
    console.log('✅ Response:', response3.data);
    console.log('---\n');

    console.log('🎉 Tất cả test đều PASS!');

  } catch (error) {
    console.error('❌ Lỗi khi test API:');
    
    if (error.response) {
      // Server trả về lỗi
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      // Không thể kết nối
      console.error('Không thể kết nối đến server:', error.message);
      console.error('Kiểm tra server có đang chạy trên port 3002 không?');
    } else {
      // Lỗi khác
      console.error('Error:', error.message);
    }
  }
}

// Chạy test
testChatAPI();