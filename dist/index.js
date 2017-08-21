'use strict';

var _messageDecoder = require('./messageDecoder');

var _messageDecoder2 = _interopRequireDefault(_messageDecoder);

var _connectionManager = require('./connectionManager');

var _connectionManager2 = _interopRequireDefault(_connectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var zmq = require('zeromq');
var sock = zmq.socket('pull');

var log = console.log;

var ip = 'tcp://127.0.0.1:5555';

var connectionManager = new _connectionManager2.default();
var messageQueue = new _messageDecoder2.default();

sock.bindSync(ip);

log('Worker bound on ' + ip + '.');

sock.on('message', function (msg) {
  _messageDecoder2.default.decodeMessage(msg).then(function (message) {
    return messageQueue.push(message);
  }).then(function () {
    var message = messageQueue.pop();
    var clients = connectionManager.getClients();
    var knownSockets = connectionManager.getSockets();
    var ioSockets = Object.keys(io.sockets.sockets).map(function (i) {
      return i;
    });

    Object.keys(knownSockets).forEach(function (socketId) {
      if (ioSockets.indexOf(socketId) === -1) return;

      var client = clients[knownSockets[socketId]];

      if (message.acting_user.id !== client.id) {
        log('Sending ' + message.action + ' to user ' + client.id + ' initiated by ' + message.acting_user.id);
        io.sockets.sockets[client.socket_id].emit(message.action, message.content);
      }
    });
  }).catch(function (err) {
    log(err);
  });
});

io.on('connection', function (socket) {
  socket.on('init', function (data) {
    connectionManager.addClient(data, socket.client).then(function (client) {
      log('Client ' + client.socket_id + ' with username ' + client.username + ' acknowledged connection.');
    });
  });

  socket.on('reconnect', function (thing) {
    console.log(thing);
  });

  socket.on('disconnect', function () {
    connectionManager.removeClient(socket.client).then(function (client) {
      log('Client ' + client.socket_id + ' with username ' + client.username + ' REMOVED.');
    });
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});