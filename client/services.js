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
      loggedIn: false,
      showRooms: false,
      showChat: false,
      setLoggedIn: function(loggedIn) {
        this.loggedIn = loggedIn;
        this.broadCast();
      },
      setShowRooms: function(showRooms) {
        this.showRooms = showRooms;
        this.broadCast();
      },
      setShowChat: function(showChat) {
        this.showChat = showChat;
        this.broadCast();
      },
      broadCast: function() {
        $rootScope.$broadcast('handleBroadcast');
      }
    };
    return globals;
}]);