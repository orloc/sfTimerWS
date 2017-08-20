import MessageDecoder from "./messageDecoder";
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const zmq = require('zeromq');
const sock = zmq.socket('pull');

const messageDecoder = new MessageDecoder();


sock.bindSync('tcp://127.0.0.1:5555');
console.log('Worker bound');

sock.on('message', function(msg){
  messageDecoder.decodeMessage(msg)
  .then((message) => {
    console.log(message);
  }).catch((err) =>
  console.log(err));
});


    /*
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on(EVENT_REMOVED, function(data){
    console.log('event removed received');
    io.emit(EVENT_REMOVED, data);
  });

  socket.on(EVENT_STARTED, function(data){
    console.log('event started received');
    io.emit(EVENT_STARTED, data);
  });

  socket.on(EVENT_PAUSED, function(data){
    console.log('event pause received');
    io.emit(EVENT_PAUSED, data);
  });

  socket.on(EVENT_RESET, function(data){
    console.log('event reset received');
    io.emit(EVENT_RESET, data);
  });

  socket.on(EVENT_ADDED, function(data){
    console.log('event add received');
    io.emit(EVENT_ADDED, data);
  });
});


io.on('disconnect', function(socket){
  console.log('socket connection closed');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    */