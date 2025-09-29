const readline = require("readline");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function sendMessage(message) {
  try {
    const res = await fetch("http://localhost:3002/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log("AI:", data.reply);
  } catch (err) {
    console.error("❌ Lỗi:", err.message);
  }
}

function prompt() {
  rl.question("Bạn: ", async (msg) => {
    if (msg.toLowerCase() === "exit") {
      rl.close();
      return;
    }
    await sendMessage(msg);
    prompt();
  });
}

console.log("💬 Chat với AI (gõ 'exit' để thoát)\n");
prompt();
