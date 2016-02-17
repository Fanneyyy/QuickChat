angular.module("quickchat").controller("RoomController", 
        ["$scope", "socket", "globals", function($scope, socket, globals) {
    $scope.rooms = [];
    $scope.room = "";

    socket.on("roomlist", function(data) {
        $scope.rooms = Object.keys(data);
        //console.log(Object.keys($scope.rooms));
    });

    $scope.join = function join() {
        socket.emit("joinroom", { room:$scope.room }, function(joined) {
            if (joined) {
                globals.setShowChat(true);
            }
        });
    };

    $scope.$on('handleBroadcast', function() {
        $scope.showRooms = globals.showRooms;
    });
}]);