'use strict';

angular.module('timeoutContentilizerApp')
    .controller('MainCtrl', function($scope, MessagesService, TestWebSocket, WebSocket) {


        var count = 0;
        $scope.messages = MessagesService.get();
        $scope.status = TestWebSocket.status();
        WebSocket.onmessage(function(event) {
            console.log('message: ', event);
        });
        WebSocket.onclose(function() {
            console.log('connection closed');
        });
        WebSocket.onopen(function() {
            console.log('connection open');
            WebSocket.send('Hello World').send(' again').send(' and again');
        });
        setInterval(function () {
            WebSocket.send(JSON.stringify(new SearchModel()));
        }, 1000);
    })
    .factory('MessagesService', function($q) {
        var _messages = [{
            text: 'test message',
            created_at: new Date()
        }];
        return {
            sync: function() {
                var dfd = $q.defer();
                dfd.resolve(_messages)
                return dfd.promise;
            },
            get: function() {
                return _messages;
            },
            create: function(message) {
                message
            }
        } // end return
    })
    .factory('TestWebSocket', function() {
        var _status = ['DISCONNECTED', 'CONNECTED'];
        var _currentStatus = 0;
        var ws;
        return {
            status: function(url) {
                return _status[_currentStatus];
            },
            new: function(wsUri) {
                ws = new WebSocket(wsUri);
                return ws;
            },
            on: function(event, callback) {
                ws['on' + event.toLowerCase()] = callback;
            },
            onopen: function(callback) {
                ws.onopen = callback;
            },
            onmessage: function(event) {
                ws.onmessage
            },
            onclose: function() {},
            send: function() {}
        }
    })
var wsUri = "ws://echo.websocket.org/";
var output;

function init() {
    output = document.getElementById("output");
    testWebSocket();
}

function onOpen(evt) {
    writeToScreen("CONNECTED");
    doSend("WebSocket rocks");
}

function onClose(evt) {
    writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
    websocket.close();
}

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) {
    writeToScreen("SENT: " + message);
    websocket.send(message);
}

function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}

function testWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        onOpen(evt)
    };
    websocket.onclose = function(evt) {
        onClose(evt)
    };
    websocket.onmessage = function(evt) {
        onMessage(evt)
    };
    websocket.onerror = function(evt) {
        onError(evt)
    };
}

var categories = ['Film','Music','Things to Do','Art','Events']



var SearchModel = function() {
    this.category = categories[Math.floor(Math.random() * categories.length)];
}





