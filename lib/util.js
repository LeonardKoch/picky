"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = function () {
    function util() {
        _classCallCheck(this, util);
    }

    _createClass(util, null, [{
        key: "isLeapYear",
        value: function isLeapYear(year) {
            if (year % 4 !== 0) {
                return false;
            } else if (year % 100 !== 0) {
                return true;
            } else if (year % 400 !== 0) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: "aBeforeB",
        value: function aBeforeB(a, b) {
            return a.year < b.year || a.year === b.year && a.month < b.month || a.year === b.year && a.month === b.month && a.day < b.day;
        }
    }, {
        key: "aAfterB",
        value: function aAfterB(a, b) {
            return a.year > b.year || a.year === b.year && a.month > b.month || a.year === b.year && a.month === b.month && a.day > b.day;
        }
    }, {
        key: "getWeekday",
        value: function getWeekday(day, month, year) {
            // Implementing Zeller's congruence
            // https://en.wikipedia.org/wiki/Zeller%27s_congruence

            var q = day;
            var m = void 0;
            var potentiallyShiftedYear = void 0;
            if (month <= 2) {
                m = month + 12;
                potentiallyShiftedYear = year - 1;
            } else {
                m = month;
                potentiallyShiftedYear = year;
            }
            var K = potentiallyShiftedYear % 100;
            var J = Math.floor(potentiallyShiftedYear / 100);

            var h = (q + Math.floor(13 * (m + 1) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + 5 * J) % 7;

            var d = (h + 5) % 7;
            return d;
        }
    }, {
        key: "getFollowingMonthNumber",
        value: function getFollowingMonthNumber(month) {
            if (month === 12) {
                return 1;
            } else {
                return month + 1;
            }
        }
    }, {
        key: "getPrecedingMonthNumber",
        value: function getPrecedingMonthNumber(month) {
            if (month === 1) {
                return 12;
            } else {
                return month - 1;
            }
        }
    }, {
        key: "getDateOfFollowingMonth",
        value: function getDateOfFollowingMonth(date) {
            var followingMonth = util.getFollowingMonthNumber(date.month);
            var yearOfFollowingMonth = followingMonth === 1 ? date.year + 1 : date.year;

            return {
                day: Math.min(date.day, util.getDaysInMonth(followingMonth, yearOfFollowingMonth)),
                month: followingMonth,
                year: yearOfFollowingMonth
            };
        }
    }, {
        key: "getDateOfPrecedingMonth",
        value: function getDateOfPrecedingMonth(date) {
            var precedingMonth = util.getPrecedingMonthNumber(date.month);
            var yearOfPrecedingMonth = precedingMonth === 12 ? date.year - 1 : date.year;

            return {
                day: Math.min(date.day, util.getDaysInMonth(precedingMonth, yearOfPrecedingMonth)),
                month: precedingMonth,
                year: yearOfPrecedingMonth
            };
        }
    }, {
        key: "getDaysInMonth",
        value: function getDaysInMonth(month, year) {
            var monthLengths = [31, util.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return monthLengths[month - 1];
        }
    }]);

    return util;
}();

module.exports = util;