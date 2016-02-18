angular.module("quickchat").controller("ChatController", 
        ["$scope", "$http", "$routeParams", "socket", "globals", function($scope, $http, $routeParams, socket, globals) {
    socket.emit("rooms");

    $scope.nick = $routeParams.nickId;
    $scope.roomName = $routeParams.roomId;
    $scope.messages = [];
    $scope.users = [];
    $scope.ops = [];
    $scope.rooms = [];

    socket.on("roomlist", function(data) {
        $scope.rooms = data;
        if ($scope.roomName !== undefined) {
            $scope.ops = $scope.rooms[$scope.roomName].ops;
            $scope.users = $scope.rooms[$scope.roomName].users;
            $scope.messages = $scope.rooms[$scope.roomName].messageHistory;
        }
    });

    socket.on("updatechat", function(data) {
        if ($scope.roomName !== undefined) {
            $scope.messages = $scope.rooms[$scope.roomName].messageHistory;
        }
    });

    $scope.addMessage = function addMessage() {
        socket.emit("sendmsg", {roomName: $scope.roomName, msg: $scope.message});
        socket.emit("rooms");
        $scope.messages = $scope.rooms[$scope.roomName].messageHistory;
    };

    $scope.$on('handleBroadcast', function() {
        $scope.showChat = globals.showChat;
    });
}]);