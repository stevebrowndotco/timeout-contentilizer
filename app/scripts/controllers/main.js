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
                    var width = "100%",
                        height = "100%";


                    var svg = d3.select(element[0])

                        .append("svg")            
                        .attr({width: width, height: height})
                        .style('background-color', '#1c2733');
                        

                        var startTime=new Date();
                    

                    //Render graph based on 'data'
                    scope.render = function(data) {

                    var circle_group = svg.selectAll(".circles").data(data);


                        circle_group.enter() 
                        .append("g")

                        .attr('transform', function(d) {
                            console.log("d:", d);
                            var scale = 10;
                            var x = d.style.left * scale;
                            var y = d.style.top * scale;
                            return 'translate(' + x + ', ' + y + ')'
                        })
                        .append("circle")
                        .attr('fill', "red")

                    
                        .attr('r',function(d) {
                            return d.visits * 5
                        })
                        .transition().delay(1000)  
                        .attr('r',function(d) {
                            return d.visits * 20
                        })
                        .exit().remove();
                      

                    /*  var circle_container = circle_group.append('a')
                        .attr('xlink:href', data.url)
                        .attr('target', '_blank')
                        .attr('fill', svg_text_color);*/

                    /*  var circle = circle_container.append('circle')
                        .classed(type, true)
                        .attr('r', size)
                        .transition()
                        .duration(max_life)
                        .style('opacity', 0)
                        .each('end', function() {
                            circle_group.remove();
                        })
                        .remove();*/
                    };

                    //Watch 'data' and run scope.render(newVal) whenever it changes
                    //Use true for 'objectEquality' property so comparisons are done on equality and not reference but this would be expensive...
                    //better solution is using $watchCollection() which make comparison on equality only when needed so... should be less expensive and more efficient that wacth with true as parameter
                    scope.$watchCollection('data', function(newVal, oldVal) {
                        scope.render(scope.data);
                    });


                }
            };
        }])
    .controller('MainCtrl', function ($scope, graffiti, WebSocket) {
        $scope.hitIds=[];
        $scope.hits = [];

        $scope.now = {};
       
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
                top: Math.floor(Math.random() * 100) + 1 ,
                left: Math.floor(Math.random() * 100) + 1 
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





