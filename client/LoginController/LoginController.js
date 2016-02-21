angular.module("quickchat").controller("LoginController", 
        ["$scope", "$http", "$location", "globals", "socket", function($scope, $http, $location, globals, socket) {
    $scope.nick = undefined;

    $scope.login = function login() {
        if ($scope.nick) {
            socket.emit("adduser", $scope.nick, function(available) {
                if (available){
                    $location.path('/home/rooms/' + $scope.nick);
                }
            });
        }
    };
    $scope.$on('$destroy', function(event) {
        console.log("Login destroyed");
    });
}]);