'use strict';

angular
    .module('realtime.main', [
        'graffiti'
    ])
    .controller('MainCtrl', function ($scope, graffiti, WebSocket) {

        $scope.hits = {};
        $scope.paused = false;

        $scope.pause = function () {
            $scope.paused = !$scope.paused;
        }

        WebSocket.onmessage(function (event) {

            var _event = JSON.parse(event.data),
                type = _event.uid.split('-')[1].toLowerCase() + 's',
                id = _event.uid.split('-')[2].toLowerCase();

            console.log(_event)

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
            $scope.status = 'CONNECTED';
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


var categories = ['Film', 'Music', 'Things to Do', 'Art', 'Events'];





