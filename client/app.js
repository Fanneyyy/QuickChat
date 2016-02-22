"use strict";
angular.module("quickchat", [
    'ngRoute',
    'luegg.directives'
    ])
    .config(function($routeProvider) {
        $routeProvider
        .when("/home/index", {
            templateUrl: "client/login/login.html",
            controller: "LoginController"
        })
        .when("/home/rooms/:nickId", {
            templateUrl: "client/room/rooms.html",
            controller: "RoomController"
        })
        .when("/home/chat/:nickId/:roomId", {
            templateUrl: "client/chat/chat.html",
            controller: "ChatController"
        })
        .otherwise( {
            redirectTo: "/home/index"
        });
    });