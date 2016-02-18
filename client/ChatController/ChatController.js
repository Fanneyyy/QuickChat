angular.module("quickchat").controller("ChatController", 
        ["$scope", "$http", "$routeParams", "socket", "globals", function($scope, $http, $routeParams, socket, globals) {
    $scope.nick = $routeParams.nickId;
    $scope.roomName = $routeParams.roomId;
    $scope.messages = [];
    $scope.users = [];
    $scope.ops = [];
    $scope.rooms = [];
    $scope.room = "";

    socket.on("roomlist", function(data) {
        $scope.rooms = data;
        if ($scope.roomName !== undefined) {
            $scope.ops = $scope.rooms[$scope.roomName].users;
            $scope.messages = $scope.rooms[$scope.roomName].messageHistory;
        }
    });

    $scope.addMessage = function addMessage() {
        socket.emit("sendmsg", $scope.message, function(available) {
            socket.emit("rooms");
        });
    };

    $scope.$on('handleBroadcast', function() {
        $scope.showChat = globals.showChat;
    });
}]);