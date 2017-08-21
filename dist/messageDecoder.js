"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _q = require("q");

var q = _interopRequireWildcard(_q);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageDecoder = function () {
  function MessageDecoder() {
    _classCallCheck(this, MessageDecoder);

    this.messages = [];
  }

  _createClass(MessageDecoder, [{
    key: "push",
    value: function push(message) {
      this.messages.push(message);
      return q.resolve();
    }
  }, {
    key: "dumpMessages",
    value: function dumpMessages() {
      console.log(this.messages);
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.messages.splice(0, 1)[0];
    }
  }], [{
    key: "decodeMessage",
    value: function decodeMessage(buffer) {
      var data = JSON.parse(buffer.toString());

      if (!_actions2.default.isValidAction(data.action)) {
        return q.reject(new Error("action " + data.action + " not supported"));
      }

      data.acting_user = JSON.parse(data.acting_user);

      return q.resolve(data);
    }
  }]);

  return MessageDecoder;
}();

exports.default = MessageDecoder;