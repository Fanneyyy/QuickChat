angular.module("quickchat").controller("RoomController", 
        ["$scope", "socket", function($scope, socket) {
    $scope.rooms = [];
    $scope.room = "";

    socket.on("roomlist", function(data) {
        $scope.rooms = Object.keys(data);
        //console.log($scope.rooms);
    });

    $scope.join = function join() {
        socket.emit("joinroom", $scope.room, function(joined) {
            if (joined) {
                console.log($scope.room);
                console.log("room joined");
            }
        });
    };
}]);