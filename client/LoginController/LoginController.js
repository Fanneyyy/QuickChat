angular.module("quickchat").controller("LoginController", 
        ["$scope", "$http", "$location", "globals", "socket", function($scope, $http, $location, globals, socket) {
    $scope.nick = "";

    $scope.login = function login() {
        socket.emit("adduser", $scope.nick, function(available) {
            if (available){
                $location.path('/home/rooms/' + $scope.nick);
            }
        });
    };
}]);