import MessageDecoder from "./messageDecoder";
import ConnectionManger from './connectionManager';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const zmq = require('zeromq');
const sock = zmq.socket('pull');

const log = console.log;

const ip = 'tcp://127.0.0.1:5555';

const connectionManager = new ConnectionManger();
const messageQueue = new MessageDecoder();

sock.bindSync(ip);

log(`Worker bound on ${ip}.`);

sock.on('message', (msg)  => {
  MessageDecoder.decodeMessage(msg)
    .then((message) => messageQueue.push(message))
    .then(() => {
      const message = messageQueue.pop();
      const clients = connectionManager.getClients();
      const knownSockets = connectionManager.getSockets();
      const ioSockets = Object.keys(io.sockets.sockets).map((i) => i);
      
      Object.keys(knownSockets).forEach((socketId) => {
        if (ioSockets.indexOf(socketId) === -1) return;
        
        const client = clients[knownSockets[socketId]];

        if (message.acting_user.id !== client.id){
          log(`Sending ${message.action} to user ${client.id} initiated by ${message.acting_user.id}`);
          io.sockets.sockets[client.socket_id].emit(message.action, message.content);
        }
      });
    }).catch((err) =>{
      log(err);
  });
});

io.on('connection', (socket) => {
  socket.on('init', (data) => {
    connectionManager.addClient(data, socket.client)
      .then((client) => {
        log(`Client ${client.socket_id} with username ${client.username} acknowledged connection.`);
      });
  });
  
  socket.on('reconnect', (thing) => {
    console.log(thing);
  });

  socket.on('disconnect', () => {
    connectionManager.removeClient(socket.client)
    .then((client) => {
      log(`Client ${client.socket_id} with username ${client.username} REMOVED.`);
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
