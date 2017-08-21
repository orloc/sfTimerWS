'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var q = _interopRequireWildcard(_q);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionManager = function () {
  function ConnectionManager() {
    _classCallCheck(this, ConnectionManager);

    this.clients = {};
    this.sockets = {};
  }

  _createClass(ConnectionManager, [{
    key: 'addClient',
    value: function addClient(user, socket) {
      if (typeof user.id === 'undefined' || user.id === null) {
        return q.reject(new Error('User auth must have an id'));
      }

      var client = Object.assign({}, user, { socket_id: socket.id });
      this.clients[client.id] = client;
      this.sockets[socket.id] = client.id;

      return q.resolve(client);
    }
  }, {
    key: 'isAcknowledged',
    value: function isAcknowledged(socket) {
      if (typeof socket.id === 'undefined' || socket.id === null) {
        return q.reject(new Error('socket must have an id'));
      }
      return this.sockets[socket.id] && typeof this.clients[this.sockets[socket.id]] !== 'undefined';
    }
  }, {
    key: 'getClients',
    value: function getClients() {
      return this.clients;
    }
  }, {
    key: 'getSockets',
    value: function getSockets() {
      return this.sockets;
    }
  }, {
    key: 'removeClient',
    value: function removeClient(socket) {
      if (typeof socket.id === 'undefined' || socket.id === null) {
        return q.reject(new Error('socket must have an id'));
      }

      if (this.sockets[socket.id] && typeof this.clients[this.sockets[socket.id]] !== 'undefined') {
        var client = this.clients[this.sockets[socket.id]];
        delete this.clients[this.sockets[socket.id]];
        delete this.sockets[socket.id];
        return q.resolve(client);
      }

      return q.reject(new Error('Invalid or already moved - otherwise not found socket'));
    }
  }]);

  return ConnectionManager;
}();

exports.default = ConnectionManager;