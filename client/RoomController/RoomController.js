angular.module("quickchat").controller("RoomController", 
        ["$scope", "$routeParams", "$location", "socket", "globals", 
        function($scope, $routeParams, $location, socket, globals) {
    
    socket.emit("rooms");

    $scope.rooms = [];
    $scope.roomlist = [];
    $scope.roomName = "";
    $scope.roomTopic = "";
    $scope.nick = $routeParams.nickId;

    socket.on("roomlist", function(data) {
        $scope.rooms = data;
        $scope.getNumberOfUsers();
    });

    socket.on("updatetopic", function(room, topic) {
        socket.emit("rooms");
    });

    $scope.getNumberOfUsers = function getNumberOfUsers() {
        $scope.roomlist = [];
        $.each($scope.rooms, function(key, value) {
            $scope.roomlist.push({
                room: key,
                topic: value.topic,
                size: Object.keys(value.users).length
            });
        });
    };

    $scope.join = function join(theRoom) {
        socket.emit("joinroom", { room: theRoom }, function(accepted, reason) {
            if (accepted) {
                alertify.success("Joined " + theRoom);
            }
            else {
                alertify.error("Couldn't join " + theRoom + " " + reason);
                $location.path('/home/rooms/' + $scope.nick);
            }
        });
    };

    $scope.createRoom = function createRoom() {
        if ($scope.roomName !== "") {
            socket.emit("joinroom", { room: $scope.roomName}, function(joined) {
                if (joined) {
                    $scope.setTopic($scope.roomName, $scope.roomTopic);
                    $location.path('/home/chat/' + $scope.nick + "/" + $scope.roomName);
                    alertify.success('Room created!');
                }
                else {
                    alertify.error('Room creation failed');
                }
            });
        }
    };

    $scope.setTopic = function setTopic(room, topic) {
        if (topic) {
            socket.emit("settopic", {room: room, topic: topic}, function(success) {
                if (success) {
                    console.log("new topic set");
                }
            });
        }
    };
    $scope.$on('$destroy', function(event) {
        console.log("Room destroyed");
    });
}]);