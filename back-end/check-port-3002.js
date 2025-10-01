const net = require('net');
const socket = new net.Socket();

socket.setTimeout(3000);

socket.on('connect', function() {
  console.log('Port 3002 is open and accepting connections');
  socket.destroy();
});

socket.on('timeout', function() {
  console.log('Connection timed out (no listener on port 3002)');
  socket.destroy();
});

socket.on('error', function(err) {
  console.log('Connection error:', err.message);
});

socket.connect(3002, '127.0.0.1');
console.log('Attempting TCP connection to 127.0.0.1:3002...');