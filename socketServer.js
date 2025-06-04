// socketServer.js

const { Server } = require('socket.io');

const io = new Server(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('newReply', (data) => {
    io.emit('replyReceived', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

console.log('WebSocket server running on port 3001');
