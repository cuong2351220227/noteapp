const axios = require('axios');

(async () => {
  try {
    const res = await axios.get('http://localhost:3002/chat/health', { timeout: 5000 });
    console.log('Health response:', res.data);
  } catch (err) {
    console.error('Health check failed:', err.message);
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', JSON.stringify(err.response.data, null, 2));
    } else if (err.request) {
      console.error('No response received. Request details:');
      console.error(err.request);
    }
  }
})();