angular.module("quickchat").controller("ChatController", 
        ["$scope", "$http", "$location", "$routeParams", "socket", "globals", 
        function($scope, $http, $location, $routeParams, socket, globals) {

    $scope.nick = $routeParams.nickId;
    $scope.roomName = $routeParams.roomId;
    $scope.roomTopic = "";
    $scope.messages = [];
    $scope.users = [];
    $scope.ops = [];
    $scope.rooms = [];


    socket.emit("rooms");

    socket.on("roomlist", function(data) {
        $scope.rooms = data;
        if ($scope.roomName !== undefined) {
            $scope.ops = $scope.rooms[$scope.roomName].ops;
            $scope.users = $scope.rooms[$scope.roomName].users;
            $scope.roomTopic = $scope.rooms[$scope.roomName].topic;
        }
    });

    socket.on("updatechat", function(roomName, messageHistory) {
        if (roomName !== undefined) {
            $scope.messages = messageHistory;
        }
    });

    socket.on("servermessage", function(message, room, user) {
        if (room !== undefined) {
            $scope.servermessage = {message: message, room: room, user: user};
        }
    });

    socket.on("updateusers", function(roomName, users, ops) {
        if (roomName !== undefined) {
            $scope.users = users;
            $scope.ops = ops;
        }
    });

    socket.on("kicked", function(room, user) {
        if ($scope.roomName === room && $scope.nick === user) {
            $location.path('/home/rooms/' + $scope.nick);
        };
    });

    $scope.kickUsers = function kickUsers(user) {
        for (var i = 0, len = user.length; i < len; i++) {
            $scope.kickUser(user[i]);
        }
    };

    $scope.kickUser = function kickUser(user) {
        socket.emit("kick", {room: $scope.roomName, user:user}, function(success) {
            if (!success) {
                $scope.servermessage = {message: "You are not an Op", room: $scope.roomName, user: $scope.nick};
            }
        });
    };

    $scope.addMessage = function addMessage() {
        if ($scope.message != "") {
            socket.emit("sendmsg", {roomName: $scope.roomName, msg: $scope.message});
            $scope.message = "";
        }
    };

    $scope.leaveRoom = function leaveRoom() {
        socket.emit("partroom", $scope.roomName);
        $location.path('/home/rooms/' + $scope.nick);
    };

    $scope.$on('handleBroadcast', function() {
        $scope.showChat = globals.showChat;
    });
}]);