angular.module("quickchat").controller("LoginController", 
        ["$scope", "$http", "$location", "globals", "socket", function($scope, $http, $location, globals, socket) {
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
                globals.setLoggedIn(true);
                globals.setShowRooms(true);
                socket.emit("rooms");
                socket.emit("users");
                $location.path('/home/rooms/' + $scope.nick);
            }
        });
    };

    $scope.$on('handleBroadcast', function() {
        $scope.loggedIn = globals.loggedIn;
    });
}]);