"use strict";

angular.module("quickchat", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
    .when("/home/index", {
        templateUrl: "client/index.html",
        controller: "HomeController"
    })
    .when("home/rooms", {
        templateUrl: "client/rooms.html",
        controller: "RoomController"
    })
    .when("home/chat", {
        templateUrl: "client/chat.html",
        controller: "ChatController"
    })
    .when("home/login", {
        templateUrl: "client/login.html",
        controller: "LoginController"
    })
    .otherwise( {
        redirectTo: "/home/index"
    });
});
angular.module("quickchat", []);

angular.module("quickchat").controller("HomeController", 
        ["$scope", "$http", "socket", function($scope, $http, socket) {

    $scope.nick = "";
    $scope.loggedIn = false;
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
                socket.emit("rooms");
                socket.emit("users");
            }
        });
    };
    $scope.joinRoom = function joinRoom() {
        socekt.emit("joinroom", $scope.name, )
    }
}]);