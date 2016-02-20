angular.module("quickchat").factory('socket', ["$rootScope", function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}]);

angular.module("quickchat").factory('globals', ["$rootScope", function ($rootScope) {
    var globals = {
      privateMessages: [],
      addMessage: function(obj) {
        this.privateMessages.push(obj);
        this.broadCast();
      },
      broadCast: function() {
        $rootScope.$broadcast('handleBroadcast');
      }
    };
    return globals;
}]);