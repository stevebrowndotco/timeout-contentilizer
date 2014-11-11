'use strict';

angular
    .module('realtime.main', [
        'graffiti',
        'highcharts-ng'
    ])
    .controller('MainCtrl', function ($scope, graffiti, WebSocket) {

        $scope.hits = {};

        $scope.now = {};

        $scope.myValueFunction = function(card) {
            return card.values.opt1;
        }

        $scope.sorter = '-visits';

        WebSocket.onmessage(function (event) {

            var _event = JSON.parse(event.data),
                type = _event.uid.split('-')[1].toLowerCase() + 's',
                id = _event.uid.split('-')[2].toLowerCase();

            graffiti.client('/v1/sites/' + _event.site + '/' + type + '/' + id, 'GET').then(function (data) {

                var idExists = _.find($scope.hits, function (v) {
                    return _event.uid === v.uid;
                });

                if (idExists) {
                    $scope.hits[_event.uid].increaseVisitor();
                    $scope.hits[_event.uid].scale()
                } else {

                    var hit = new VisitModel(data.body);

                    $scope.hits[_event.uid] = hit;

                    if(data.body.image_url) {
                        $scope.now = hit;
                    }

                }
            })


        });

        WebSocket.onopen(function () {
//            console.log('connection open');
            $scope.status = 'CONNECTED';
        });

        var VisitModel = function (data) {

            this.image = data.image && data.image.url_pattern ? data.image.url_pattern.value.replace('{width}', '150').replace('{height}', '113') : null;
            this.name = data.name ? data.name : null;
            this.uid = data.uid ? data.uid : null;
            this.link = data.to_website ? data.to_website : null;
            this.category = data.categorisation ? data.categorisation.primary.name : null;
            this.visits = 1;
            this.rate = data.rate ? data.rate : null;
            this.date = new Date();
            this.city = data.city;
            this.style = {
                top: Math.floor(Math.random() * 100) + 1 + '%',
                left: Math.floor(Math.random() * 100) + 1 + '%'
            }


            VisitModel.prototype.increaseVisitor = function () {
                this.visits = this.visits + 1;
            };

            VisitModel.prototype.scale = function() {
                this.style.transform = 'scale('+this.visits+')';
            }

        };


    })

var categories = ['Film', 'Music', 'Things to Do', 'Art', 'Events'];
var sites = ['london', 'newyork', 'barcelona', 'losangeles', 'chicago', 'berlin'];





