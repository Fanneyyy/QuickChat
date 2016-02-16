"use strict";
angular.module("quickchat", [
    'ngRoute',
    'LoginController'
    ]);


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


angular.module("quickchat").controller("HomeController", 
        ["$scope", "$http", "socket", function($scope, $http, socket) {


}]);