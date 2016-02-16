angular.module("quickchat").controller("ChatController", 
        ["$scope", "$routeParams", "$http", "socket", function($scope, $http, $routeParams, socket) {
    $scope.nick = "";
    $scope.roomId = $routeParams.roomId;
    $scope.users = roomId;
    $scope.messages = [];
    $scope.room = undefined;

    socket.on("roomlist", function(data) {
        debugger;
        $scope.room = data;
        $scope.roomName = Object.keys(data);
    });

    $scope.chat = function chatty() {
        socket.emit("comment", $scope.message, function(available) {
            // Todo. Add to room history etc..
        });
    };
}]);