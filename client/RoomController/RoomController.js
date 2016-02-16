angular.module("quickchat").controller("RoomController", 
        ["$scope", "$http", "socket", function($scope, $http, socket) {
    $scope.rooms = [];
    $scope.room = "";

    socket.on("roomlist", function(data) {
         $scope.rooms = Object.keys(data);
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