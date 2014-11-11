'use strict';

describe('service', function() {
    beforeEach(module('pp.graffiti'));
    beforeEach(function() {
        module(function($provide) {
            $provide.constant('GRAFFITI', { host: 'http://graffiti.test', token: 'token' });
        });
    });

    describe('graffiti', function() {
        var $httpBackend;

        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('constructor', function() {
            it('fetches access token', inject(function($injector) {
                $httpBackend.expectPOST('http://graffiti.test/v1/oauth2/token', 'token').respond(200, { access_token: 'a-magic-token' });
                var graffiti = $injector.get('graffiti'),
                    accessToken;
                graffiti.token().then(function(token){
                    accessToken = token;
                });
                $httpBackend.flush();
                expect(accessToken).toEqual('a-magic-token');
            }));
        });
    });
});