angular.module("quickchat").controller("RoomController", 
        ["$scope", "$routeParams", "$location", "socket", "globals", 
        function($scope, $routeParams, $location, socket, globals) {
    
    socket.emit("rooms");

    $scope.rooms = [];
    $scope.roomlist = [];
    $scope.roomName = "";
    $scope.nick = $routeParams.nickId;

    socket.on("roomlist", function(data) {
        $scope.rooms = data;
        $scope.getNumberOfUsers();
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
        socket.emit("joinroom", { room: theRoom }, function(joined) {
            if (joined) {
                console.log("room joined");
            }
        });
    };

    $scope.createRoom = function createRoom() {
        if ($scope.roomName !== "") {
            socket.emit("joinroom", { room: $scope.roomName}, function(joined) {
                if (joined) {
                    $scope.setTopic($scope.roomName, $scope.roomTopic);
                    $location.path('/home/chat/' + $scope.nick + "/" + $scope.roomName);
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
}]);