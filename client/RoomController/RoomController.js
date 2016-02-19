angular.module("quickchat").controller("RoomController", 
        ["$scope", "$routeParams", "$location", "socket", "globals", 
        function($scope, $routeParams, $location, socket, globals) {
    
    socket.emit("rooms");

    $scope.rooms = [];
    $scope.roomlist = [];
    $scope.nick = $routeParams.nickId;

    socket.on("roomlist", function(data) {
        $scope.rooms = data;
        $scope.getNumberOfUsers();
    });

    $scope.getNumberOfUsers = function getNumberOfUsers() {
        $scope.roomlist = [];
        $.each($scope.rooms, function(key, value) {
            $scope.roomlist.push({
                room:key, 
                size:Object.keys(value.users).length
            });
        });
    };

    $scope.join = function join(theRoom) {
        socket.emit("joinroom", { room:theRoom }, function(joined) {
            if (joined) {
                console.log("room joined");
            }
        });
    };

    $scope.createRoom = function createRoom() {
        socket.emit("joinroom", { room: $scope.roomName, pass: $scope.roomPassword}, function(joined) {
            if (joined) {
                $scope.setTopic($scope.roomName, $scope.roomTopic);
                $location.path('/home/chat/' + $scope.nick + "/" + $scope.roomName);
            }
        });
    };

    $scope.setTopic = function setTopic(room, topic) {
        socket.emit("settopic", {room: room, topic: topic}, function(success) {
            if (success) {
                console.log("new topic set");
            }
        });
    };

    $scope.$on('handleBroadcast', function() {
        $scope.showRooms = globals.showRooms;
    });
}]);