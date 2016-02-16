angular.module("quickchat").controller("LoginController", 
        ["$scope", "$http", "socket", function($scope, $http, socket) {
    $scope.nick = "";
    $scope.rooms = [];
    $scope.users = [];

    socket.on("roomlist", function(data) {
        $scope.rooms = data;
    });

    socket.on("userlist", function(data) {
        $scope.users = data;
    });

    $scope.login = function login() {
        socket.emit("adduser", $scope.nick, function(available) {
            if (available){
                $scope.loggedIn = true;
                $scope.showRooms = false;
                $scope.showChat = false;
                socket.emit("rooms");
                socket.emit("users");
            }
        });
    };
}]);