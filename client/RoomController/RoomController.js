angular.module("quickchat").controller("RoomController", 
        ["$scope", "$routeParams", "$location", "socket", "globals", function($scope, $routeParams, $location, socket, globals) {
    $scope.rooms = [];
    $scope.room = "";
    $scope.nick = $routeParams.nickId;

    socket.on("roomlist", function(data) {
        $scope.rooms = Object.keys(data);
    });

    $scope.join = function join() {
        socket.emit("joinroom", { room:$scope.room }, function(joined) {
            if (joined) {
                globals.setShowChat(true);
                $location.path('/home/chat/' + $scope.nick + "/" + $scope.room);
            }
        });
    };

    $scope.$on('handleBroadcast', function() {
        $scope.showRooms = globals.showRooms;
    });
}]);