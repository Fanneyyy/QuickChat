angular.module("quickchat").controller("RoomController", 
        ["$scope", "$routeParams", "$location", "socket", "globals", function($scope, $routeParams, $location, socket, globals) {
    socket.emit("rooms");

    $scope.rooms = [];
    $scope.room = "";
    $scope.numberOfUsers = [];
    $scope.nick = $routeParams.nickId;

    socket.on("roomlist", function(data) {
        $scope.rooms = Object.keys(data);
        debugger;
        console.log(data);
    });

    $scope.join = function join() {
        socket.emit("joinroom", { room:$scope.room }, function(joined) {
            if (joined) {
                $location.path('/home/chat/' + $scope.nick + "/" + $scope.room);
            }
        });
    };

    $scope.join = function createRoom() {
        socket.emit("joinroom", { room:$scope.room }, function(joined) {
            if (joined) {
                $location.path('/home/chat/' + $scope.nick + "/" + $scope.room);
            }
        });
    };

    $scope.$on('handleBroadcast', function() {
        $scope.showRooms = globals.showRooms;
    });
}]);