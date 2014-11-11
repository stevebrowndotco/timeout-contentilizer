'use strict';

angular.module('date',[])
    .factory('date', function () {

        /**
         * Takes a day and gives you the first Monday of the week it's on.
         * @param d
         * @returns {Date}
         */

        var getMonday = function(d) {
            var day = d.getDay(),
                diff = d.getDate() - day + (day === 0 ? -6 : 1);
            return new Date(d.setDate(diff)).toISOString();
        };

        /**
         * Takes a day and gives you the first day of the month it's on.
         * @returns {Date}
         */

        var getMonthStart = function(d) {
            return new Date(d.getFullYear(), d.getMonth()).addHours(d.getHours()).toISOString();
        };

        /**
         * Takes an array of days with properties (such as views) and groups them by weeks or months.
         * @param timeUnit
         * @param data
         * @returns {Array}
         */

        var groupBy = function (timeUnit, days) {

            var startPeriod = '';

            if(timeUnit === 'day') {
                return days;
            }

            //Mutate array to include the start of the period for each date.
            angular.forEach(days, function (day) {

                if(timeUnit === 'week') {
                    day.startPeriod = getMonday(new Date(day.start_date));
                } else if (timeUnit === 'month') {
                    day.startPeriod = getMonthStart(new Date(day.start_date));
                }

            });

            //Return the days grouped by start period
            return _.map(_.groupBy(days, 'startPeriod'), function (g) {
                return {
                    start_date: g[0].startPeriod,
                    end_date: new Date(g[g.length - 1].start_date).toISOString(),
                    views: _(g).reduce(function (m, x) {
                        return m + x.views;
                    }, 0) };
            });

        };

        /**
         * Counts the number of days between two time periods
         * @param firstDate
         * @param lastDate
         * @returns {number}
         */

        var countDays = function(firstDate, lastDate) {
            var oneDay = 24 * 60 * 60 * 1000,
                _firstDate = new Date(firstDate),
                _secondDate = new Date(lastDate),
                numberOfDays = Math.round(Math.abs((_firstDate.getTime() - _secondDate.getTime()) / (oneDay)));
            return numberOfDays;
        };

        return {
            today: function() {
                return new Date();
            },
            daysAgo: function (daysFrom) {
                var days = daysFrom,
                    date = new Date(),
                    daysAgo = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));
                return new Date(daysAgo);
            },
            countDays: function (firstDate, lastDate) {
                return countDays(firstDate, lastDate);
            },
            createUTCDate: function(dateString) {
                var splitDate = dateString.split(/([0-9]{4}-[0-9]{2}-[0-9]{2})T.*/)[1].split('-'),
                    newDate = new Date(Date.UTC(splitDate[0], splitDate[1] - 1, splitDate[2]));
                return newDate.setTime(newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000);
            },
            getMonday: getMonday,
            groupBy: groupBy,
            getDayStart: function (d) {
                return new Date(d.getFullYear(), d.getMonth(), d.getDate());
            }
        };
    });

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
};