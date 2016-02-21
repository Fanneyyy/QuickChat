angular.module("quickchat").controller("ChatController", 
        ["$scope", "$http", "$location", "$routeParams", "socket", "globals", 
        function($scope, $http, $location, $routeParams, socket, globals) {

    socket.emit("rooms");
    socket.emit("updatechat");
    socket.emit("updateusers");
    
    $scope.nick = $routeParams.nickId;
    $scope.roomName = $routeParams.roomId;
    $scope.roomTopic = "";
    $scope.message = "";
    $scope.messages = [];
    $scope.users = [];
    $scope.ops = [];
    $scope.rooms = [];
    $scope.servermessage = "";
    $scope.privatemessages = [];
    $scope.messagesViewModel = [];

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
            $scope.populateViewModel();
        }
    });

    socket.on("servermessage", function(message, room, user) {
        if (room !== undefined) {
            $scope.servermessage = {message: message, room: room, user: user, type: "server"};

        }
    });

    socket.on("updateusers", function(roomName, users, ops) {
        if (roomName !== undefined) {
            $scope.users = users;
            $scope.ops = ops;
        }
    });

    socket.on("recv_privatemsg", function(nick, msg) {
        console.log("private message recieved");
        globals.addMessage({
            from: nick, 
            to: $scope.nick,
            timestamp:  new Date(),
            message: msg.substring(0, 200),
            room: $scope.roomName,
            type: "private"
        });
        $scope.populateViewModel();
    });

    socket.on("kicked", function(room, user) {
        if ($scope.roomName === room && $scope.nick === user) {
            $location.path('/home/rooms/' + $scope.nick);
        }
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
        if ($scope.message !== "") {
            socket.emit("sendmsg", {roomName: $scope.roomName, msg: $scope.message});
            $scope.message = "";
        }
    };

    $scope.leaveRoom = function leaveRoom() {
        socket.emit("partroom", $scope.roomName);
        $location.path('/home/rooms/' + $scope.nick);
    };

    $scope.sendPrivateMessage = function sendPrivateMessage(user) {
        socket.emit("privatemsg", {nick: user, message: $scope.message}, function(success) {
            console.log("send message");
            if (success) {
                globals.addMessage({
                    from: $scope.nick, 
                    to: user[0],
                    timestamp:  new Date(),
                    message: $scope.message.substring(0, 200),
                    room: $scope.roomName,
                    type: "private"
                });
                $scope.message = "";
                $scope.populateViewModel();
            }
        });
    };

    $scope.$on('handleBroadcast', function() {
        //$scope.populateMessages();
    });

    $scope.populateViewModel = function populateViewModel() {
        $scope.messagesViewModel = [];
        $.each($scope.messages, function(key, value) {
            value.type = "global";
            $scope.messagesViewModel.push(value);
        });
        $.each(globals.privateMessages, function(key, value) {
            if ($scope.roomName === value.room) {
                if (value.from === $scope.nick) {
                    value.nick = "You to ";
                }
                $scope.messagesViewModel.push(value);
                if (value.to === $scope.nick) {
                    value.nick = value.from;
                $scope.messagesViewModel.push(value);
                }
            }
        });
    };
}]);