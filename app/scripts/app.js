'use strict';

angular
    .module('timeoutContentilizerApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'angular-websocket',
        'ngAnimate'
    ])
    .config(function ($routeProvider, WebSocketProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
            WebSocketProvider
                .prefix('')
                .uri('ws://echo.websocket.org/');
    });
