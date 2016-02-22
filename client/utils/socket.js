angular.module("quickchat").factory('socket', ["$rootScope", function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
         //console.log("on in services");
          if (callback) {
            callback.apply(socket, args);
          }
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
    },
    getSocket: function() {
      return socket;
    }
  };
}]);