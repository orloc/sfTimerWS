'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

var EVENT_REMOVED = 'eqt:timer:removed';
var EVENT_STARTED = 'eqt:timer:started';
var EVENT_ADDED = 'eqt:timer:added';


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on(EVENT_REMOVED, function(data){
    console.log('event removed recieved', data);
    io.emit(EVENT_REMOVED, data);
  });

  socket.on(EVENT_STARTED, function(data){
    console.log('event started recieved', data);
    io.emit(EVENT_STARTED, data);

  });

  socket.on(EVENT_ADDED, function(data){
    console.log('event add recieved', data);
    io.emit(EVENT_ADDED, data);
  });
});


io.on('disconnect', function(socket){
  console.log('socket connection closed');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});