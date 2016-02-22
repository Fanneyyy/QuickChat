angular.module("quickchat").factory('globals', ["$rootScope", function ($rootScope) {
    var globals = {
      privateMessages: [],
      addMessage: function(obj) {
        obj.timestamp = obj.timestamp.toJSON();
        this.privateMessages.push(obj);
      }
    };
    return globals;
}]);