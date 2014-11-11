'use strict';

angular
    .module('realtime.main', [
        'graffiti'
    ])
    .controller('MainCtrl', function ($scope, MessagesService, TestWebSocket, WebSocket, graffiti) {

        $scope.hits = {};
        $scope.paused = false;

        $scope.pause = function () {
            $scope.paused = !$scope.paused;
        }

        $scope.messages = MessagesService.get();
        $scope.status = TestWebSocket.status();
        WebSocket.onmessage(function (event) {

            var _event = JSON.parse(event.data),
                type = _event.uid.split('-')[1].toLowerCase() + 's',
                id = _event.uid.split('-')[2].toLowerCase();

            graffiti.client('/v1/sites/'+_event.site+'/'+type+'/'+id, 'GET').then(function(data){

                var idExists = _.find($scope.hits, function (v) {
                    return _event.uid === v.uid;
                });

                if (idExists) {
                    $scope.hits[_event.uid].increaseVisitor();
                    $scope.hits[_event.uid].changeSize()
                } else {
                    $scope.hits[_event.uid] = new VisitModel(data.body);
                }
            })

        });

        WebSocket.onclose(function () {
            console.log('connection closed');
        });
        WebSocket.onopen(function () {
            console.log('connection open');
        });

        var VisitModel = function (data) {

            var image = data.image && data.image.url_pattern ? data.image.url_pattern.value.replace('{width}','150').replace('{height}','113') : null;

            this.image = image;
            this.name = data.name;
            this.uid = data.uid;
            this.link = data.to_website;
            this.category = data.category;
            this.visits = 1;
            this.rate = data.rate;
            this.image_url = data.image_url;
            this.style = {
                bottom: 0,
                left: Math.floor(Math.random() * 100) + 1 + '%'
            }

            VisitModel.prototype.increaseVisitor = function () {
                this.visits = this.visits + 1;
            };

        };

    })
    .factory('MessagesService', function ($q) {
        var _messages = [
            {
                text: 'test message',
                created_at: new Date()
            }
        ];
        return {
            sync: function () {
                var dfd = $q.defer();
                dfd.resolve(_messages)
                return dfd.promise;
            },
            get: function () {
                return _messages;
            },
            create: function (message) {
                message
            }
        } // end return
    })
    .factory('TestWebSocket', function () {
        var _status = ['DISCONNECTED', 'CONNECTED'];
        var _currentStatus = 0;
        var ws;
        return {
            status: function (url) {
                return _status[_currentStatus];
            },
            new: function (wsUri) {
                ws = new WebSocket(wsUri);
                return ws;
            },
            on: function (event, callback) {
                ws['on' + event.toLowerCase()] = callback;
            },
            onopen: function (callback) {
                ws.onopen = callback;
            },
            onmessage: function (event) {
                ws.onmessage
            },
            onclose: function () {
            },
            send: function () {
            }
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
    websocket.onopen = function (evt) {
        onOpen(evt)
    };
    websocket.onclose = function (evt) {
        onClose(evt)
    };
    websocket.onmessage = function (evt) {
        onMessage(evt)
    };
    websocket.onerror = function (evt) {
        onError(evt)
    };
}

var categories = ['Film', 'Music', 'Things to Do', 'Art', 'Events'];





