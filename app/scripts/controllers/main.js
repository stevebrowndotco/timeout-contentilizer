'use strict';

angular
    .module('realtime.main', [
        'graffiti',
        'highcharts-ng'
    ])
    .directive( 'd3', [
        function() {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                link: function(scope, element) {
                    var margin = {
                            top: 20,
                            right: 20,
                            bottom: 30,
                            left: 40
                        },
                        width = 480 - margin.left - margin.right,
                        height = 360 - margin.top - margin.bottom;
                    var svg = d3.select(element[0])
                        .append("svg")
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
                    var y = d3.scale.linear().range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .ticks(10);

                    //Render graph based on 'data'
                    scope.render = function(data) {
                        //Set our scale's domains
                        x.domain(data.map(function(d) {
                            return d.name;
                        }));
                        y.domain([0, d3.max(data, function(d) {
                            return d.count;
                        })]);

                        //Redraw the axes
                        svg.selectAll('g.axis').remove();
                        //X axis
                        svg.append("g")
                            .attr("class", "x axis")
                            .attr("transform", "translate(0," + height + ")")
                            .call(xAxis);

                        //Y axis
                        svg.append("g")
                            .attr("class", "y axis")
                            .call(yAxis)
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("y", 6)
                            .attr("dy", ".71em")
                            .style("text-anchor", "end")
                            .text("Count");

                        var bars = svg.selectAll(".bar").data(data);
                        bars.enter()
                            .append("rect")
                            .attr("class", "bar")
                            .attr("x", function(d) {
                                return x(d.name);
                            })
                            .attr("width", x.rangeBand());

                        //Animate bars
                        bars
                            .transition()
                            .style("fill", "red")
                            .duration(1000)
                            .attr('height', function(d) {
                                return height - y(d.count);
                            })
                            .attr("y", function(d) {
                                return y(d.count);
                            })
                    };

                    //Watch 'data' and run scope.render(newVal) whenever it changes
                    //Use true for 'objectEquality' property so comparisons are done on equality and not reference
                    scope.$watch('data', function() {
                        scope.render(scope.data);
                    }, true);
                }
            };
        }])
    .controller('MainCtrl', function ($scope, graffiti, WebSocket) {
        $scope.hitIds=[];
        $scope.hits = [];

        $scope.now = {};
        $scope.myData = [
            {name: 'AngularJS', count: 300},
            {name: 'D3.JS', count: 150},
            {name: 'jQuery', count: 400},
            {name: 'Backbone.js', count: 300},
            {name: 'Ember.js', count: 100}
        ];
        WebSocket.onmessage(function (event) {
            console.log("event:",event);
            var _event = JSON.parse(event.data),
                type = _event.uid.split('-')[1].toLowerCase() + 's',
                id = _event.uid.split('-')[2].toLowerCase();

            graffiti.client('/v1/sites/' + _event.site + '/' + type + '/' + id, 'GET').then(function (data) {
                if(data.body.image_url) {
                    var index = $scope.hitIds.indexOf(id)

                    if (index>-1) {
                        $scope.hits[index].increaseVisitor();
                        $scope.hits[index].scale()
                    } else {

                        var hit = new VisitModel(data.body);
                        $scope.hitIds.push(id)
                        $scope.hits.push(hit);

                       
                        $scope.now = hit;
                      

                    }
                }    
            })

        });

        WebSocket.onopen(function () {
        //  console.log('connection open');
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





