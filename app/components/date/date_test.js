'use strict';

describe('date service', function () {

    beforeEach(module('pp.date'));

    describe('Date Tests', function () {

        describe('today()', function () {
            it('Retrieves today\'s date', inject(function (date) {
                expect(
                    date.today().toISOString().substr(0,16)
                ).toEqual(
                    (new Date()).toISOString().substr(0,16)
                );
            }));
        });

        describe('groupBy()', function () {

            var days = [
                {
                    "views": 4,
                    "start_date": "2014-09-01T04:00:00.000Z",
                    "end_date": "2014-09-02T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 0,
                    "start_date": "2014-09-02T04:00:00.000Z",
                    "end_date": "2014-09-03T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 262,
                    "start_date": "2014-09-03T04:00:00.000Z",
                    "end_date": "2014-09-04T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 284,
                    "start_date": "2014-09-04T04:00:00.000Z",
                    "end_date": "2014-09-05T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 311,
                    "start_date": "2014-09-05T04:00:00.000Z",
                    "end_date": "2014-09-06T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 341,
                    "start_date": "2014-09-06T04:00:00.000Z",
                    "end_date": "2014-09-07T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 289,
                    "start_date": "2014-09-07T04:00:00.000Z",
                    "end_date": "2014-09-08T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 276,
                    "start_date": "2014-09-08T04:00:00.000Z",
                    "end_date": "2014-09-09T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 306,
                    "start_date": "2014-09-09T04:00:00.000Z",
                    "end_date": "2014-09-10T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 266,
                    "start_date": "2014-09-10T04:00:00.000Z",
                    "end_date": "2014-09-11T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 325,
                    "start_date": "2014-09-11T04:00:00.000Z",
                    "end_date": "2014-09-12T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 298,
                    "start_date": "2014-09-12T04:00:00.000Z",
                    "end_date": "2014-09-13T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                },
                {
                    "views": 299,
                    "start_date": "2014-09-13T04:00:00.000Z",
                    "end_date": "2014-09-14T04:00:00.000Z",
                    "startPeriod": "2014-09-01T04:00:00.000Z"
                }
            ];

            it('Returns the days back', inject(function (date) {
                expect(date.groupBy('day', days)).toEqual(days);
            }));


            it('Groups days into weeks', inject(function (date) {

                var weeks = [
                    {
                        "start_date": "2014-09-01T04:00:00.000Z",
                        "end_date": "2014-09-07T04:00:00.000Z",
                        "views": 1491
                    },
                    {
                        "start_date": "2014-09-08T04:00:00.000Z",
                        "end_date": "2014-09-13T04:00:00.000Z",
                        "views": 1770
                    }
                ];

                expect(date.groupBy('week', days)).toEqual(weeks);

            }));

            it('Groups days into months', inject(function (date) {

                var months = [
                    {
                        "start_date": "2014-09-01T04:00:00.000Z",
                        "end_date": "2014-09-13T04:00:00.000Z",
                        "views": 3261
                    }
                ];

                expect(date.groupBy('month', days)).toEqual(months);

            }));

        });

        describe('countDays()', function() {
            it('Counts the days between two periods', inject(function(date) {
                expect(date.countDays('2014-08-20T16:29:53+02:00', '2014-11-20T15:29:53+01:00')).toEqual(92);
            }));
        });

        describe('getMonday()', function() {
            it('Takes a day and gives you the first Monday of the week it\'s on in ISO', inject(function (date) {
                expect(date.getMonday(new Date("February 01, 2014 00:00:00")).toString())
                .toEqual('2014-01-27T00:00:00.000Z');
            }));
        });

        describe('createUTCDate()', function () {
            it('Takes an ISO date string, and converts to the same date in local time for days, month and year', inject(function (date) {

                var localDate = new Date(date.createUTCDate('2014-10-08T00:00:00+01:00'));

                expect(localDate.getDate()).toEqual(8);         // Match Day of month
                expect(localDate.getMonth()).toEqual(10 - 1);   // Match month (base 0)
                expect(localDate.getFullYear()).toEqual(2014);  // Match year

            }));
        });

    });

});