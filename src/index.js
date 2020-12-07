const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const router = require('./routes');

mongoose.connect('mongodb://192.168.99.100:27017/ezorders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use((request, response, next) => {
  request.io = io;
  return next();
});
app.use(cors());
app.use(express.json());
app.use(router);

server.listen(3001, () => {
  console.log('Server started  at localhost:3001');
});
