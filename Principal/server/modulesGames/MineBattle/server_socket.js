const app = require('express')();

const http = require('http').Server(app);

const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:5004'],
  },
});

io.on('connection', (socket) => {
  console.log('player connected');

  socket.on('disconnect', () => {
    console.log('player disconnected');
  });

  socket.on('move', ({ x, y }) => {
    socket.broadcast.emit('move', { x, y });
  });
  socket.on('moveEnd', () => {
    socket.broadcast.emit('moveEnd');
  });
});

http.listen(3500, () => {
  console.log('le serveur websocket pour MineBattle est en écoute sur le port 3500');
});