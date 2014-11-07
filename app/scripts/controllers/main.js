'use strict';

angular.module('timeoutContentilizerApp')
    .controller('MainCtrl', function($scope, MessagesService, TestWebSocket, WebSocket, $window) {

        var MAX_IDS = 10;
        var timeStart = new Date();

        $scope.pages = {};
        $scope.paused = false;

        $scope.pause = function() {
            $scope.paused = !$scope.paused;
        }

        $scope.messages = MessagesService.get();
        $scope.status = TestWebSocket.status();
        WebSocket.onmessage(function(event) {

            var _event = JSON.parse(event.data);

            var idExists = _.find($scope.pages, function (v) {
                return _event.uid === v.uid;
            });

            if(idExists) {
                $scope.pages[_event.uid].increaseVisitor();
                $scope.pages[_event.uid].updateVelocity();
            } else {
                $scope.pages[_event.uid] = new VisitModel(_event);
                console.log($scope.pages[_event.id])
            }

        });

        WebSocket.onclose(function() {
            console.log('connection closed');
        });
        WebSocket.onopen(function() {
            console.log('connection open');
        });

        var VisitModel = function(data) {

            this.uid = data.uid;
            this.category = data.category;
            this.visits = 1;
            this.rate = data.rate;
            this.image_url = data.image_url;
            this.timeLastVisited = new Date();
            this.timeFirstVisited = new Date();
            this.acceleration = 0;

            VisitModel.prototype.updateVelocity = function() {

                var t0 = this.timeLastVisited - timeStart;
                var t1 = new Date() - timeStart;

                var v0 = this.velocity;
                var v1 = (this.visits / ((t1 - t0) /  1000)).toFixed(2);

                this.velocity = v1;
                this.acceleration = ((v1 - v0) / (t1 - t0)).toFixed(2);
                this.timeLastVisited = new Date();

            };

            VisitModel.prototype.increaseVisitor = function() {
                this.visits = this.visits + 1;
            };

        };

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
var wsUri = "ws://qa17.d:3000";
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

var categories = ['Film','Music','Things to Do','Art','Events'];





