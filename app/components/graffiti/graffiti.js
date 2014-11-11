'use strict';

angular
    .module('graffiti',[
        'date'
    ])
    .factory('graffiti', function ($q, $http, date) {

        var basePath = '/v1/sites/',
            accessToken,
            cacheCounter = Math.round(Math.random() * 100000);

        var GRAFFITI = {
            host: 'http://graffiti.internal.timeout.com/public',
            token: 'client_id=local-listers&client_secret=4a201577-9d93-4974-8906-47263d421a79&grant_type=authorization_code&scope=local-listers',
            location: 'london'
        }

        function graffiti(requestParams) {
            var defer = $q.defer();

            if(requestParams.params) requestParams.params.cacheCounter = cacheCounter;

            if(requestParams.method === 'PUT' || requestParams.method === 'POST') {
                cacheCounter++;
            }

            $http({
                method: requestParams.method,
                url: requestParams.endpoint,
                data: requestParams.data,
                headers: requestParams.headers,
                params: requestParams.params,
                cache: true
            })
            .success(function(data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data, status);
            });

            return defer.promise;
        }

        function client(endpoint, method, params, data) {

            var requestParams = {
                method: method,
                endpoint: GRAFFITI.host +   endpoint,
                params: params,
                data: data
            };

            return request(requestParams);
        }

        function getGraffitiToken() {
            if (!accessToken) {
                var defer = $q.defer();
                accessToken = defer.promise;

                graffiti({
                    method: 'POST',
                    endpoint: GRAFFITI.host + '/v1/oauth2/token',
                    data: GRAFFITI.token,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(response) {
                    defer.resolve(response.access_token);
                });
            }

            return accessToken;
        }

        function request(requestParams) {
            var defer = $q.defer();

//            getGraffitiToken().then(function (accessToken) {
//                requestParams.headers = getHeaders(accessToken);
                defer.resolve(graffiti(requestParams));
//            });

            return defer.promise;
        }

        function getHeaders(accessToken) {
            return {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json;charset=utf-8'
            };
        }

        function getUser(auth) {
            var requestParams = {
                method: 'GET',
                endpoint: GRAFFITI.host +  '/v1/users/' + auth.UID,
                params: {
                    uidSignature: auth.UIDSignature,
                    signatureTimestamp: auth.signatureTimestamp
                }
            };
            return request(requestParams);
        }

        function getUserVenues(user) {
            var requestParams = {
                method: 'GET',
                endpoint: GRAFFITI.host +  '/v1/users/' + user.uid + '/premium-venues',
                params: {
                    uidSignature: user.uidSignature,
                    signatureTimestamp: user.signatureTimestamp
                }
            };
            return request(requestParams);
        }

        function resetPassword(token, password) {
            var requestParams = {
                method: 'POST',
                endpoint: GRAFFITI.host +  '/v1/reset-password',
                data: {
                    reset_token: token,
                    password: password
                }

            };
            return request(requestParams);
        }

        function getTopVenues() {
            var requestParams = {
                method: 'GET',
                headers: getHeaders(),
                endpoint: GRAFFITI.host +  basePath + 'london' + '/search',
                params: {
                    what: 'canned-restaurants',
                    page_size: 100
                }
            };
            return request(requestParams);
        }


        function tagDictionary(locale) {

            var requestParams = {
                method: 'GET',
                endpoint: GRAFFITI.host +  '/v1/taxonomy',
                params: {
                    group: 'owner',
                    locale: locale
                }
            };

            return request(requestParams);
        }

        function convertToUTC(array) {
            angular.forEach(array, function(val) {
                val.start_date = new Date(date.createUTCDate(val.start_date));
                val.end_date = new Date(date.createUTCDate(val.end_date));
            });
            return array;
        }

        return {
            client              :       client,
            token               :       getGraffitiToken,
            getUser             :       getUser,
            userVenues          :       getUserVenues,
            topVenues           :       getTopVenues,
            resetPassword       :       resetPassword,
            tagDictionary       :       tagDictionary,
            convertToUTC        :       convertToUTC
        };

    });