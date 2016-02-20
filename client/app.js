"use strict";
angular.module("quickchat", [
    'ngRoute',
    'luegg.directives'
    ])
    .config(function($routeProvider) {
        $routeProvider
        .when("/home/index", {
            templateUrl: "client/LoginController/login.html",
            controller: "LoginController"
        })
        .when("/home/rooms/:nickId", {
            templateUrl: "client/RoomController/rooms.html",
            controller: "RoomController"
        })
        .when("/home/chat/:nickId/:roomId", {
            templateUrl: "client/ChatController/chat.html",
            controller: "ChatController"
        })
        .otherwise( {
            redirectTo: "/home/index"
        });
    });