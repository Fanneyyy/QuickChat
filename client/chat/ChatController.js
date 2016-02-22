angular.module("quickchat").controller("ChatController", ["$scope", "$location", "$routeParams", "socket", "globals",
    function($scope, $location, $routeParams, socket, globals) {

        $scope.nick = $routeParams.nickId;
        $scope.roomName = $routeParams.roomId;
        $scope.roomTopic = "";
        $scope.message = "";
        $scope.messages = [];
        $scope.users = [];
        $scope.ops = [];
        $scope.userlist = [];
        $scope.rooms = [];
        $scope.privatemessages = [];
        $scope.messagesViewModel = [];

        socket.emit("rooms");
        socket.emit("updatechat", $scope.roomName);

        socket.on("roomlist", function(data) {
            $scope.rooms = data;
            if ($scope.roomName !== undefined) {
                $scope.ops = $scope.rooms[$scope.roomName].ops;
                $scope.users = $scope.rooms[$scope.roomName].users;
                $scope.updateUsers();
                $scope.roomTopic = $scope.rooms[$scope.roomName].topic;
                $scope.messages = $scope.rooms[$scope.roomName].messageHistory;
            }
        });

        socket.on("updatedchat", function(roomName, messageHistory) {
            if (roomName === $scope.roomName) {
                $scope.messages = messageHistory;
                $scope.populateViewModel();
            }
        });

        socket.on("updateusers", function(roomName, users, ops) {
            if (roomName === $scope.roomName) {
                $scope.users = users;
                $scope.ops = ops;
                $scope.updateUsers();
            }
        });

        socket.on("recv_privatemsg", function(nick, msg) {
            console.log("private message recieved");
            if (nick !== undefined) {
                globals.addMessage({
                    from: nick,
                    to: $scope.nick,
                    timestamp: new Date(),
                    message: msg.substring(0, 200),
                    room: $scope.roomName,
                    type: "private"
                });
                $scope.populateViewModel();
            }
        });

        socket.on("kicked", function(room, user) {
            if ($scope.roomName === room && $scope.nick === user) {
                $location.path('/home/rooms/' + $scope.nick);
                alertify.error("You have been kicked from " + room);
            }
        });

        socket.on("banned", function(room, user) {
            if ($scope.roomName === room && $scope.nick === user) {
                $location.path('/home/rooms/' + $scope.nick);
                alertify.error("You have been banned from " + room);
            }
        });

        $scope.kickUsers = function kickUsers(user) {
            for (var i = 0, len = user.length; i < len; i++) {
                $scope.kickUser(user[i]);
            }
        };

        $scope.kickUser = function kickUser(user) {
            if (user.startsWith("@")) {
                user = user.substr(1, user.length);
            }
            socket.emit("kick", {
                room: $scope.roomName,
                user: user
            }, function(success) {
                if (!success) {
                    alertify.error("You are not an Op in room: " + $scope.roomName + " Sir/Madame " + $scope.nick);
                } else {
                    alertify.success("You have successfully kicked " + user + " from " + $scope.roomName);
                }
            });
        };

        $scope.opUsers = function opUsers(user) {
            for (var i = 0, len = user.length; i < len; i++) {
                $scope.opUser(user[i]);
            }
        };

        $scope.opUser = function opUser(user) {
            socket.emit("op", {
                room: $scope.roomName,
                user: user
            }, function(success) {
                if (!success) {
                    alertify.error("You are not an Op in room: " + $scope.roomName + " Sir/Madame " + $scope.nick);
                } else {
                    alertify.success("Successfully opped " + user);
                }
            });
        };

        $scope.deopUsers = function deopUsers(user) {
            for (var i = 0, len = user.length; i < len; i++) {
                $scope.deopUser(user[i]);
            }
        };

        $scope.deopUser = function deopUser(user) {
            if (user.startsWith("@")) {
                user = user.substr(1, user.length);
            }
            socket.emit("deop", {
                room: $scope.roomName,
                user: user
            }, function(success) {
                if (!success) {
                    alertify.error("You are not an Op in room: " + $scope.roomName + " Sir/Madame " + $scope.nick);
                } else {
                    alertify.success("Successfully deopped " + user);
                }
            });
        };

        $scope.banUsers = function banUsers(user) {
            for (var i = 0, len = user.length; i < len; i++) {
                $scope.banUser(user[i]);
            }
        };

        $scope.banUser = function kickUser(user) {
            if (user.startsWith("@")) {
                user = user.substr(1, user.length);
            }
            socket.emit("ban", {
                room: $scope.roomName,
                user: user
            }, function(success) {
                if (!success) {
                    alertify.error("You are not an Op in room: " + $scope.roomName + " Sir/Madame " + $scope.nick);
                } else {
                    alertify.success("Successfully banned " + user);
                }
            });
        };

        $scope.addMessage = function addMessage() {
            if ($scope.message !== "") {
                socket.emit("sendmsg", {
                    roomName: $scope.roomName,
                    msg: $scope.message
                });
                $scope.message = "";
            }
        };

        $scope.leaveRoom = function leaveRoom() {
            socket.emit("partroom", $scope.roomName);
            $location.path('/home/rooms/' + $scope.nick);
        };

        $scope.sendPrivateMessages = function sendPrivateMessages(user) {
            if ($scope.message !== "") {
                if (user) {
                    for (var i = 0, len = user.length; i < len; i++) {
                        if (user[i].startsWith("@")) {
                            $scope.sendPrivateMessage(user[i].substr(1, user[i].length), $scope.message);
                        } else {
                            $scope.sendPrivateMessage(user[i], $scope.message);
                        }
                    }
                    $scope.message = "";
                } else {
                    alertify.error("Please select a user to send " + "'" + $scope.message + "'");
                }
            }
        };

        $scope.updateUsers = function updateUsers() {
            $scope.userlist = [];
            $.each($scope.users, function(key, value) {
                if ($.inArray(value, Object.keys($scope.ops)) > -1) {
                    $scope.userlist.push("@" + value);
                } else {
                    $scope.userlist.push(value);
                }
            });
            $scope.userlist.sort();
        };

        $scope.sendPrivateMessage = function sendPrivateMessage(username, msg) {
            if (username !== $scope.nick) {
                socket.emit("privatemsg", {
                    nick: username,
                    message: msg
                }, function(success) {
                    if (success) {
                        globals.addMessage({
                            from: $scope.nick,
                            to: username,
                            timestamp: new Date(),
                            message: msg.substring(0, 200),
                            room: $scope.roomName,
                            type: "private"
                        });
                        $scope.populateViewModel();
                    } else {
                        alertify.error("Failed in sending private message");
                    }
                });
            }
        };

        $scope.populateViewModel = function populateViewModel() {
            $scope.messagesViewModel = [];
            $.each($scope.messages, function(key, value) {
                value.type = "global";
                $scope.messagesViewModel.push(value);
            });
            $.each(globals.privateMessages, function(key, value) {
                console.log(globals.privateMessages);
                if ($scope.roomName === value.room) {
                    if (value.from === $scope.nick) {
                        $scope.messagesViewModel.push(value);
                    } else if (value.to === $scope.nick) {
                        $scope.messagesViewModel.push(value);
                    }
                }
            });
            $scope.messagesViewModel.sort(SortByDate);
        };

        $scope.$on('$destroy', function(event) {
            socket.getSocket().removeAllListeners();
        });

        function SortByDate(a, b) {
            return a.timestamp > b.timestamp;
        }
    }
]);