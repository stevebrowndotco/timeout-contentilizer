'use strict'; 

angular
    .module('realtime', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'angular-websocket',
        'realtime.main',
        'ui.bootstrap'
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
//                .uri('ws://qa17.d:3000');
                        .uri('ws://qa17.d:3000');
    });
