angular.module("quickchat").controller("LoginController", ["$scope", "$location", "globals", "socket", function($scope, $location, globals, socket) {
    $scope.nick = undefined;

    $scope.login = function login() {
        if ($scope.nick) {
            socket.emit("adduser", $scope.nick, function(available) {
                if (available) {
                    $location.path('/home/rooms/' + $scope.nick);
                } else {
                    alertify.error("Username entered is not available");
                }
            });
        }
    };
    $scope.$on('$destroy', function(event) {
        socket.getSocket().removeAllListeners();
    });
}]);