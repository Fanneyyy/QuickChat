angular.module("quickchat").controller("RoomController", 
        ["$scope", "socket", "globals", function($scope, socket, globals) {
    $scope.rooms = [];
    $scope.room = "";

    socket.on("roomlist", function(data) {
        $scope.rooms = data;
        console.log(Object.keys($scope.rooms));
    });
    //Object.keys(data)

    $scope.join = function join() {
        socket.emit("joinroom", $scope.room, function(joined) {
            if (joined) {
                console.log($scope.room);
                console.log("room joined");
            }
        });
    };

    $scope.$on('handleBroadcast', function() {
        $scope.showRooms = globals.showRooms;
    });
}]);