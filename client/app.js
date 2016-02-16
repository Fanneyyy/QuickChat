"use strict";
angular.module("quickchat", [
    'ngRoute',
    'LoginController'
    ]);

angular.module("quickchat", []);

angular.module("quickchat", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
    .when("/home/index", {
        templateUrl: "client/HomeController/home.html",
        controller: "HomeController"
    })
    .when("home/rooms", {
        templateUrl: "client/RoomController/rooms.html",
        controller: "RoomController"
    })
    .when("home/chat", {
        templateUrl: "client/ChatController/chat.html",
        controller: "ChatController"
    })
    .when("home/login", {
        templateUrl: "client/LoginController/login.html",
        controller: "LoginController"
    })
    .otherwise( {
        redirectTo: "/home/index"
    });
});