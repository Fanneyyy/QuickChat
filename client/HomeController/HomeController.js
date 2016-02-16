angular.module("quickchat").controller("HomeController", 
        ["$scope", "$http", "socket", function($scope, $http, socket) {

    $scope.loggedIn = false;
    $scope.showRooms = true;
    $scope.showChat = true;
}]);