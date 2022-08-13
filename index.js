const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  // options
  cors: {
    origin: "http://localhost:63342" // Указываем url на котором работает сайт
  }
});

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = [];
const connections = [];

io.on('connection', (socket) => {
  console.log('Success');
  connections.push(socket);

  socket.on('disconnect', () => {
    console.log('Disconnect');
    connections.splice(connections.indexOf(socket), 1);
  });

  socket.on('sendMessage', (data) => {
    io.emit('addMessage', data)
  });
});

httpServer.listen(PORT, () => {
  console.log('listening on ', PORT);
});