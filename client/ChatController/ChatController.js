angular.module("quickchat").controller("ChatController", 
        ["$scope", "$routeParams", "$http", "socket", function($scope, $http, $routeParams, socket) {
    $scope.nick = "";
    $scope.roomName = "";
    $scope.messages = [];
    $scope.room = undefined;

    socket.on("roomlist", function(data) {
        $scope.room = data;
        $scope.roomName = Object.keys(data);
    });

    $scope.chat = function chatty() {
        socket.emit("comment", $scope.message, function(available) {
            // Todo. Add to room history etc..
        });
    };
}]);