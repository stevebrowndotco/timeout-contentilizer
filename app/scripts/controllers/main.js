'use strict';

angular.module('timeoutContentilizerApp')

    .controller('MainCtrl', function($scope, MessagesService, TestWebSocket, WebSocket, $timeout) {
        $scope.images=[
            '5007470787_82b346d019.jpg',
            '15007178939_3676f53d8e.jpg',
            '3342633030_d90e6af294.jpg',
            '7931665396_5bf9545d49_n.jpg',
            '3734653014_78ce90d7de.jpg',
            '10796617776_907c9ae131_n.jpg',
            '4675768093_df18eea70f.jpg',
            '5157542876_c009923977.jpg',
            '4676382178_8b7f143f17_m.jpg',
            '7511421444_b0808b3496_m.jpg',
            '4675785129_b21e3939c9_m.jpg',
            '4676394014_cf59f0877e_n.jpg',
            '8658605999_21f77b2331.jpg',
            '7511421584_29d48e4831_n.jpg',
            '58933696_60cba1c27b.jpg',
            '2840523691_4ee3feb56d_m.jpg',
            '5797162725_6088d93d55.jpg',
            '4894156963_88e438049b_m.jpg',
            '171927640_2d5f7fb678.jpg',
            '171927764_22aff93b3c.jpg',
            '13123384064_89fdb424f1.jpg',
            '13123382794_d3427fb1b3.jpg',
            '13123383474_fb71bdf1c7.jpg',
            '5509083202_efb0b830c2_n.jpg',
            '13123205603_75132ba4e2.jpg',
            '7250680994_1ab429ce5e.jpg',
            '387924323_c278dc8a85.jpg',
            '9626896699_da359abdd6.jpg',
            '171927882_e040883893.jpg',
            '4875904902_00c7f50ec1.jpg',
            '58933643_d5b7957210.jpg',
            '2510083498_3bb7c9ff83_m.jpg',
            '2454625807_f004dc90c4_n.jpg',
            '2971402147_eaaefb3c61.jpg',
            '9905034134_525fd375bc.jpg',
            '429444579_841c9b38b2.jpg',
            '429445035_a158c53717.jpg',
            '2440513073_0a27f47b5c.jpg',
            '2441343234_34aa86eca6.jpg',
            '4421271010_1a7dd89f23.jpg',
            '2381651119_28dbfa3746.jpg',
            '2381650977_3d2805b645.jpg',
            '2381651877_a87c8ddc9b.jpg',
            '2382482652_b0561952b7.jpg',
            '2381651359_5000a02c5b.jpg',
            '2382483668_298be6bc84.jpg',
            '8128407325_c93a507d54.jpg',
            '4421271012_c8e410e4a9.jpg',
            '9774929744_4d3a29be15_m.jpg',
            '7003247594_57d81d1997_n.jpg',
            '3801270798_c8d012f0b9.jpg',
            '9208490364_c57ddbd090_c.jpg',
            '326264469_d453494950.jpg',
            '8008680304_73de21c14d_n.jpg',
            '7725862140_e2d5885ac2.jpg',
            '12973812745_fbef886e76_n.jpg',
            '4421271004_1a0854786f.jpg',
            '424837225_8faf0d3f63.jpg',
            '5178325934_e2713b02a0.jpg',
            '10993962503_571fe1fc3f_n.jpg',
            '10993923224_31470227ed_n.jpg',
            '14963403456_59728095de.jpg',
            '8332968165_abf2c78d87_n.jpg',
            '5189339904_7c3fd0cd65.jpg',
            '8371967505_9acde2db1f_n.jpg',
            '10993768223_989407a51f_n.jpg',
            '8893242943_5330b491aa_n.jpg',
            '8893353751_cdbd0ca5d2.jpg',
            '3295371448_24e125384d_z.jpg',
            '6085220510_06c008ca36_z.jpg',
            '7717355332_a4157a3605.jpg',
            '12974212024_a9116bab18_n.jpg',
            '2731897805_15d77db706.jpg',
            '5251746969_413e6d9ec3.jpg',
            '10994033553_a3d1c2a28e_n.jpg',
            '7972560858_d88d039860.jpg',
            '6915135131_4ff351901c.jpg',
            '5363375860_990e54b6e1_n.jpg',
            '4938985593_8386c42b94_n.jpg',
            '5618197459_9071498522.jpg',
            '9018065380_36c5acc7f3_n.jpg',
            '8107998154_9cbfba6b2b_n.jpg',
            '13971111505_8aa964e22b.jpg',
            '7966362900_d49be1c494.jpg',
            '4779442084_452653cf90.jpg',
            '8088216815_d9c3997289.jpg',
            '12973798295_6ae194c6cf_n.jpg',
            '4368542652_d096e801c0.jpg',
            '7708901344_4f39729d79.jpg',
            '4834522862_15f46f6087.jpg',
            '8891684961_44979511ec_n.jpg',
            '8892304070_a0403bcd06_n.jpg',
            '9539472128_f8bb0ed4df_n.jpg',
            '8371966805_534dec69b1_m.jpg',
            '10993695866_023270837c_m.jpg',
            '8905035347_63e569008f_m.jpg',
            '11048100283_2f59b08c82_m.jpg',
            '8735470496_f00b8acbdb_m.jpg',
            '8311369286_31bf7d02b1_m.jpg',
            '9579490314_bf1602de38_m.jpg',
            '14033813934_f9481d3b4d_m.jpg',
            '10994009733_f11b6e48f5_m.jpg',
            '10993766066_d8e0145b9a_m.jpg',
            '10993875276_c61774edf1_m.jpg',
            '3670937645_5731a436ff.jpg',
            '5597732778_8832be41c3_m.jpg',
            '10993997103_cce5d2a431_m.jpg',
            '10993888256_7383759336_m.jpg',
            '7708814566_c6ae85c4be.jpg',
            '6855594565_30f9fe7600.jpg',
            '205627205_4a1205d7fc.jpg',
            '4398467076_80159b702d_n.jpg',
            '401924523_2e216d3d84.jpg',
            '401924587_f550ca09c8.jpg',
            '382741798_6a1f01b8ed_m.jpg',
            '4397701919_4578b22c69_n.jpg',
            '12973931453_dc077721f6_n.jpg',
            '11067084965_5c3b9077cb_n.jpg',
            '7725863276_b0373ccce4.jpg',
            '6137469800_2eda0ddccf.jpg'
        ];
        var categories=[
            'Things_to_do',
            'Art',
            'Kids\'_activities',
            'Walks_and_tours',
            'Theatre',
            'Attractions_and_museums',
            'Shopping',
            'Books_and_poetry',
            'Science',
            'Music',
            'Sport_and_fitness',
            'Families',
            'Food_and_drink',
            'Film',
            'Educational_books',
            'Festivals',
            'Alternative_nightlife',
            'Classes',
            'LGBT',
            'Dance'
        ];
        var categoriesTitles=[
            'Things to do',
            'Art',
            'Kids\' activities',
            'Walks and tours',
            'Theatre',
            'Attractions and museums',
            'Shopping',
            'Books and poetry',
            'Science',
            'Music',
            'Sport and fitness',
            'Families',
            'Food and drink',
            'Film',
            'Educational books',
            'Festivals',
            'Alternative nightlife',
            'Classes',
            'LGBT',
            'Dance'
        ]
       
        $scope.categories=categories;
        $scope.venues=[];
        var getImage = function() {
            return Math.floor(Math.random() * $scope.images.length)
        };

        var getCategory = function() {
       
            var r=Math.floor(Math.random() * ($scope.categories.length))
            return r
        };
    
        var seedVenue= function(venuesCount) {

            for (var i = 0; i <  venuesCount; i++) {
                var venue={
                    index:i,
                    visitPerMinute: Math.floor(Math.random() * 10),
                    counter:0,
                    visitCount:0,
                    category:categories[getCategory()],
                    href:$scope.images[i],
                    name:"venue-"+i
                }
            $scope.venues.push(venue)    
            }

        };
        seedVenue(120);
        $scope.pages=[];
        var seed = function() {
            var counter=0
            angular.forEach($scope.venues,function(venue) {
                for (var u = 0; u < venue.visitPerMinute; u++) {
                    var page={
                        id:counter,
                        venue:venue
                    };
                    counter=counter+1;
                    $scope.pages.push(page);
                };
            })
        }; 

      
        seed();

        var sendMessage=function() {
            $timeout(function(){
                var pageId;

                if ($scope.pages.length==0) {
                    seed()
                }
                pageId=Math.floor(Math.random() * $scope.pages.length);
             
                var venue=$scope.pages[pageId].venue;
                venue.time=new Date();
                $scope.pages.splice(pageId,1)

                WebSocket.send(JSON.stringify(venue));

                sendMessage()
            }, Math.floor(Math.random() *1000));            
        }
        $scope.log=[]
        angular.forEach(categories, function(each,i) {
            var cat= {
                category:each,
                venue:{},
                title:"'"+categoriesTitles[i]+"'"
            }
            $scope.log.push(cat)
        })

        $scope.messages = MessagesService.get();
        $scope.status = TestWebSocket.status();
        
        WebSocket.onmessage(function(event) {
            var venue = JSON.parse(event.data); 
            var catIndex=categories.indexOf(venue.category)
            $scope.log[catIndex].new=false;

            $timeout(function(){
             
                $scope.venues[venue.index].visitCount=$scope.venues[venue.index].visitCount+1

                $scope.log[catIndex].style={
                        'background-image': 'url(fakeImages/' + $scope.venues[venue.index].href +')',
                        'background-size' : 'cover',

                    };
                $scope.log[catIndex].venue=$scope.venues[venue.index];
                $scope.log[catIndex].new=true;
            }, 3000);
            
        });

        WebSocket.onclose(function() {
        });
        WebSocket.onopen(function() {
            sendMessage();
        });
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



/*var VisitModel = function() {
    this.id = Math.floor(Math.random() * 50) + 1;
    this.category = categories[Math.floor(Math.random() * categories.length)];
    this.visits = 1;
    this.timeLastVisited = new Date();
    this.timeFirstVisited = new Date();
    this.velocity = 0;

    VisitModel.prototype.updateVelocity = function() {
        this.velocity = (this.timeLastVisited * 1000) / this.visits;
    }
};*/



