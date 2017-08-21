'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageActions = function () {
  function PackageActions() {
    _classCallCheck(this, PackageActions);
  }

  _createClass(PackageActions, null, [{
    key: 'getActions',
    value: function getActions() {
      return {
        create: 'action:create',
        update: 'action:update',
        delete: 'action:delete'
      };
    }
  }, {
    key: 'isValidAction',
    value: function isValidAction(action) {
      var actions = this.getActions();
      return Object.keys(actions).map(function (i) {
        return actions[i];
      }).indexOf(action) >= 0;
    }
  }]);

  return PackageActions;
}();

exports.default = PackageActions;