"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var viewDataHelpers = function () {
    function viewDataHelpers() {
        _classCallCheck(this, viewDataHelpers);
    }

    _createClass(viewDataHelpers, null, [{
        key: "createDayObject",
        value: function createDayObject(day, weekday, month, year, constraints) {

            var dayObj = {
                day: day, weekday: weekday, month: month, year: year
            };

            viewDataHelpers.getDateComparatives();

            return dayObj;
        }
    }, {
        key: "generateYearViewData",
        value: function generateYearViewData(year) {
            var isLeapYear = _util2.default.isLeapYear(year);
            return {
                year: year,
                isLeapYear: isLeapYear,
                numberOfDays: isLeapYear ? 366 : 365,
                months: new Array(12).fill(0).map(function (value, index) {
                    return index + 1;
                }).map(function (monthNumber) {
                    return viewDataHelpers.generateMonthViewData(monthNumber, year);
                })
            };
        }
    }, {
        key: "getDateComparatives",
        value: function getDateComparatives(date, constraints) {
            // Implement stuff from checkConstraintViolation
            // return
        }
    }, {
        key: "generateMonthViewData",
        value: function generateMonthViewData(month, year, constraints) {
            var startWeekday = _util2.default.getWeekday(1, month, year);

            var precedingMonth = _util2.default.getPrecedingMonthNumber(month);
            var yearOfPrecedingMonth = precedingMonth === 12 ? year - 1 : year;
            var daysInPrecedingMonth = _util2.default.getDaysInMonth(precedingMonth, year);

            var followingMonth = _util2.default.getFollowingMonthNumber(month);
            var yearOfFollowingMonth = followingMonth === 1 ? year + 1 : year;

            var daysInCurrentMonth = _util2.default.getDaysInMonth(month, year);

            var weeks = [];

            var currentDate = 1;
            var currentWeekIndex = 0;
            var currentDayInFollowingMonth = 1;

            weeks[currentWeekIndex] = [];

            for (var i = 0; i < startWeekday; i++) {
                weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(daysInPrecedingMonth - startWeekday + 1 + i, i, precedingMonth, yearOfPrecedingMonth, constraints));
            }
            while (weeks[currentWeekIndex].length < 7 || currentDate <= daysInCurrentMonth) {
                if (weeks[currentWeekIndex].length === 7) {
                    currentWeekIndex++;
                    weeks[currentWeekIndex] = [];
                }
                if (currentDate <= daysInCurrentMonth) {
                    weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(currentDate, weeks[currentWeekIndex].length + 1, month, year, constraints));
                    currentDate++;
                } else {
                    weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(currentDayInFollowingMonth, weeks[currentWeekIndex].length + 1, followingMonth, yearOfFollowingMonth, constraints));
                    currentDayInFollowingMonth++;
                }
            }
            return {
                month: month,
                year: year,
                weeks: weeks
            };
        }
    }]);

    return viewDataHelpers;
}();

module.exports = viewDataHelpers;