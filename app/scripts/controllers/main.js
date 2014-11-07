'use strict';

angular.module('timeoutContentilizerApp')
  .controller('MainCtrl', function ($scope, WebSocket) {

        WebSocket.onopen(function() {
            console.log('connection');
            WebSocket.send('message')
        });

        WebSocket.onmessage(function(event) {
            console.log(event)
            console.log('message: ', event.data);
        });

  });
