angular.module("quickchat").controller("ChatController", 
        ["$scope", "$routeParams", "$http", "socket", "globals", function($scope, $http, $routeParams, socket, globals) {
    console.log($routeParams);
    $scope.nick = "";
    $scope.roomName = "";
    $scope.messages = [];
    $scope.room = "";

    socket.on("roomlist", function(data) {
        $scope.room = data;
        $scope.roomName = Object.keys(data);
    });

    $scope.chat = function addMessage() {
        socket.emit("sendmsg", $scope.message, function(available) {
            // Todo. Add to room history etc..
        });
    };

    $scope.$on('handleBroadcast', function() {
        $scope.showChat = globals.showChat;
    });
}]);