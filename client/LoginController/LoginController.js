angular.module("quickchat").controller("LoginController", 
        ["$scope", "$http", "globals", "socket", function($scope, $http, globals, socket) {
    $scope.nick = "";
    $scope.rooms = [];
    $scope.users = [];

    socket.on("roomlist", function(data) {
        $scope.rooms = data;
        console.log($scope.rooms);
    });

    socket.on("userlist", function(data) {
        $scope.users = data;
    });

    $scope.login = function login() {
        socket.emit("adduser", $scope.nick, function(available) {
            if (available){
                globals.setLoggedIn(true);
                globals.setShowRooms(false);
                globals.setShowChat(false);
                socket.emit("rooms");
                socket.emit("users");
            }
        });
    };

    $scope.$on('handleBroadcast', function() {
        $scope.loggedIn = globals.loggedIn;
        $scope.showRooms = globals.showRooms;
        $scope.showChat = globals.showChat;
    });
}]);