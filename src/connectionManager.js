import * as q from 'q';

class ConnectionManager {

  constructor(){
    this.clients = {};
    this.sockets = {};
  }

  addClient(user, socket){
    if (typeof user.id === 'undefined' || user.id === null){
      return q.reject(new Error('User auth must have an id'));
    }
    
    const client = Object.assign({}, user, { socket_id: socket.id });
    this.clients[client.id] = client;
    this.sockets[socket.id] = client.id;

    return q.resolve(client);
  }
  
  isAcknowledged(socket){
    if (typeof socket.id === 'undefined' || socket.id === null){
      return q.reject(new Error('socket must have an id'));
    }
    return this.sockets[socket.id] && typeof this.clients[this.sockets[socket.id]] !== 'undefined';
  }
  
  getClients(){
    return this.clients;
  }
  
  getSockets(){
    return this.sockets;
  }
  
  removeClient(socket){
    if (typeof socket.id === 'undefined' || socket.id === null){
      return q.reject(new Error('socket must have an id'));
    }
    
    if (this.sockets[socket.id] && typeof this.clients[this.sockets[socket.id]] !== 'undefined'){
      const client = this.clients[this.sockets[socket.id]];
      delete(this.clients[this.sockets[socket.id]]);
      delete(this.sockets[socket.id]);
      return q.resolve(client);
    }
    
    return q.reject(new Error('Invalid or already moved - otherwise not found socket'));
  }
}

export default ConnectionManager;