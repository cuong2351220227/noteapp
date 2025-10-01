const axios = require('axios');

const testMessages = [
    "Hello, how are you?",
    "What's the weather like today?",
    "Can you help me learn English?",
    "Thank you very much!"
];

async function testChat() {
    console.log("🤖 Starting Hugging Face BlenderBot chat test...\n");

    for (const message of testMessages) {
        try {
            console.log("👤 User:", message);
            
            const response = await axios.post('http://localhost:3002/chat', {
                message: message
            }, {
                timeout: 70000
            });

            if (response.data && response.data.reply) {
                console.log("🤖 Bot:", response.data.reply);
            } else {
                console.log("⚠️ Warning: Unexpected response format:", response.data);
            }
            
            console.log("-------------------");

        } catch (error) {
            console.error("❌ Error Details:");
            if (error.response) {
                // Server responded with error
                console.error("  Status:", error.response.status);
                console.error("  Data:", JSON.stringify(error.response.data, null, 2));
            } else if (error.request) {
                // Request was made but no response
                console.error("  No response received");
                console.error("  Error:", error.message);
            } else {
                // Error in setting up the request
                console.error("  Error:", error.message);
            }
            console.log("-------------------");
        }

        // Wait 5 seconds between messages to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    console.log("\n✅ Test completed!");
}

// Make sure server is running before test
console.log("⚠️ Please ensure server is running on port 3002");
console.log("Starting test in 3 seconds...\n");

setTimeout(testChat, 3000);