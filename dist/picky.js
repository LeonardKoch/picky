(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _picky = require('./lib/picky.js');

var _picky2 = _interopRequireDefault(_picky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./lib/picky.js":2}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _viewDataHelpers = require('./viewDataHelpers');

var _viewDataHelpers2 = _interopRequireDefault(_viewDataHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var picky = function () {
    function picky() {
        _classCallCheck(this, picky);
    }

    _createClass(picky, null, [{
        key: 'addCalendar',
        value: function addCalendar(state, name, startDay, startMonth, startYear) {
            if (picky.isValidPicky(state)) {
                var currentDate = new Date();

                return _extends({}, state, {
                    calendars: _extends({}, state.calendars, _defineProperty({}, name, {
                        name: name,
                        view: {
                            year: startYear || currentDate.getFullYear(),
                            month: startMonth || currentDate.getMonth() + 1,
                            day: startDay || currentDate.getDate()
                        },
                        selected: {
                            year: startYear || currentDate.getFullYear(),
                            month: startMonth || currentDate.getMonth() + 1,
                            day: startDay || currentDate.getDate()
                        }
                    }))
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'isValidPicky',
        value: function isValidPicky(state) {
            if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) === _typeof({}) && _typeof(state.calendars) === _typeof([])) {
                return true;
            } else {
                console.warn('No valid picky data passed in.');
                return false;
            }
        }
    }, {
        key: 'getCalendarViewData',
        value: function getCalendarViewData(state, name) {
            if (picky.isValidPicky(state)) {
                var calendar = state.calendars[name];
                if (calendar) {
                    return _viewDataHelpers2.default.generateMonthViewData(calendar.view.month, calendar.view.year);
                } else {
                    console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
                    return state;
                }
            } else {
                return null;
            }
        }
    }, {
        key: 'moveCalendarViewForwardOneMonth',
        value: function moveCalendarViewForwardOneMonth(state, name) {
            if (picky.isValidPicky(state)) {
                var calendar = state.calendars[name];
                if (calendar) {
                    return _extends({}, state, {
                        calendars: _extends({}, state.calendars, _defineProperty({}, name, _extends({}, calendar, {
                            view: _extends({}, calendar.view, {
                                month: calendar.view.month + 1
                            })
                        })))
                    });
                } else {
                    console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
                    return state;
                }
            } else {
                return null;
            }
        }
    }, {
        key: 'generateDatePicker',
        value: function generateDatePicker() {
            return {
                calendars: {},
                viewMode: 'month'
            };
        }
    }]);

    return picky;
}();

var datePickerData = picky.generateDatePicker();
console.log(datePickerData.calendars.length);
console.log(datePickerData);

var modifiedDatePickerData = picky.addCalendar(datePickerData, 'left', 20, 10, 2016);
console.log(modifiedDatePickerData);
console.log(modifiedDatePickerData.calendars.length);
var modifiedDatePickerData2 = picky.addCalendar(modifiedDatePickerData, 'right');
console.log(modifiedDatePickerData2);
console.log(modifiedDatePickerData2.calendars.length);
//console.log(picky.getCalendarViewData(modifiedDatePickerData2, 'left'));
console.log(modifiedDatePickerData2.calendars);
var movedDatePickerData = picky.moveCalendarViewForwardOneMonth(modifiedDatePickerData2, 'left');
console.log(movedDatePickerData.calendars);
//console.log(picky.getCalendarViewData(movedDatePickerData, 'left'));

},{"./viewDataHelpers":4}],3:[function(require,module,exports){
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
            return a.year < b.year || a.month < b.month || a.day < b.day;
        }
    }, {
        key: "aAfterB",
        value: function aAfterB(a, b) {
            return a.year > b.year || a.month > b.month || a.day > b.day;
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
        key: "getDaysInMonth",
        value: function getDaysInMonth(month, year) {
            var monthLengths = [31, util.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return monthLengths[month - 1];
        }
    }]);

    return util;
}();

module.exports = util;

},{}],4:[function(require,module,exports){
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
        value: function createDayObject(day, weekday, month, year) {
            return {
                day: day, weekday: weekday, month: month, year: year
            };
        }
    }, {
        key: "generateMonthViewData",
        value: function generateMonthViewData(month, year) {
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
                weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(daysInPrecedingMonth - startWeekday + 1 + i, i, precedingMonth, yearOfPrecedingMonth));
            }
            while (weeks[currentWeekIndex].length < 7 || currentDate <= daysInCurrentMonth) {
                if (weeks[currentWeekIndex].length === 7) {
                    currentWeekIndex++;
                    weeks[currentWeekIndex] = [];
                }
                if (currentDate <= daysInCurrentMonth) {
                    weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(currentDate, weeks[currentWeekIndex].length + 1, month, year));
                    currentDate++;
                } else {
                    weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(currentDayInFollowingMonth, weeks[currentWeekIndex].length + 1, followingMonth, yearOfFollowingMonth));
                    currentDayInFollowingMonth++;
                }
            }
            return weeks;
        }
    }]);

    return viewDataHelpers;
}();

module.exports = viewDataHelpers;

},{"./util":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9waWNreS5qcyIsImxpYi91dGlsLmpzIiwibGliL3ZpZXdEYXRhSGVscGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVNLEs7Ozs7Ozs7b0NBRWlCLEssRUFBTyxJLEVBQU0sUSxFQUFVLFUsRUFBWSxTLEVBQVc7QUFDNUQsZ0JBQUksTUFBTSxZQUFOLENBQW1CLEtBQW5CLENBQUosRUFBK0I7QUFDNUIsb0JBQU0sY0FBYyxJQUFJLElBQUosRUFBcEI7O0FBRUEsb0NBQ08sS0FEUDtBQUVJLDRDQUNPLE1BQU0sU0FEYixzQkFFUyxJQUZULEVBRWlCO0FBQ1QsOEJBQU0sSUFERztBQUVULDhCQUFNO0FBQ0Ysa0NBQU0sYUFBYSxZQUFZLFdBQVosRUFEakI7QUFFRixtQ0FBTyxjQUFjLFlBQVksUUFBWixLQUF5QixDQUY1QztBQUdGLGlDQUFLLFlBQVksWUFBWSxPQUFaO0FBSGYseUJBRkc7QUFPVCxrQ0FBVTtBQUNOLGtDQUFNLGFBQWEsWUFBWSxXQUFaLEVBRGI7QUFFTixtQ0FBTyxjQUFjLFlBQVksUUFBWixLQUF5QixDQUZ4QztBQUdOLGlDQUFLLFlBQVksWUFBWSxPQUFaO0FBSFg7QUFQRCxxQkFGakI7QUFGSjtBQW1CSCxhQXRCQSxNQXNCTTtBQUNILHVCQUFPLElBQVA7QUFDSDtBQUNKOzs7cUNBRW1CLEssRUFBTztBQUN2QixnQkFBRyxRQUFPLEtBQVAseUNBQU8sS0FBUCxlQUF3QixFQUF4QixLQUE4QixRQUFPLE1BQU0sU0FBYixjQUFrQyxFQUFsQyxDQUFqQyxFQUF1RTtBQUNuRSx1QkFBTyxJQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsd0JBQVEsSUFBUixDQUFhLGdDQUFiO0FBQ0EsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7Ozs0Q0FFMEIsSyxFQUFPLEks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QUFNLGdCQUFOLEVBQXdCLElBQXhCLENBQTZCLGdCQUFnQixlQUFoQixDQUN6Qix1QkFBdUIsWUFBdkIsR0FBc0MsQ0FBdEMsR0FBMEMsQ0FEakIsRUFFekIsQ0FGeUIsRUFHekIsY0FIeUIsRUFJekIsb0JBSnlCLENBQTdCO0FBTUg7QUFDRCxtQkFBTSxNQUFNLGdCQUFOLEVBQXdCLE1BQXhCLEdBQWlDLENBQWpDLElBQXNDLGVBQWUsa0JBQTNELEVBQStFO0FBQzNFLG9CQUFHLE1BQU0sZ0JBQU4sRUFBd0IsTUFBeEIsS0FBbUMsQ0FBdEMsRUFBeUM7QUFDckM7QUFDQSwwQkFBTSxnQkFBTixJQUEwQixFQUExQjtBQUNIO0FBQ0Qsb0JBQUcsZUFBZSxrQkFBbEIsRUFBc0M7QUFDbEMsMEJBQU0sZ0JBQU4sRUFBd0IsSUFBeEIsQ0FBNkIsZ0JBQWdCLGVBQWhCLENBQ3pCLFdBRHlCLEVBRXpCLE1BQU0sZ0JBQU4sRUFBd0IsTUFBeEIsR0FBK0IsQ0FGTixFQUd6QixLQUh5QixFQUl6QixJQUp5QixDQUE3QjtBQU1BO0FBQ0gsaUJBUkQsTUFRTztBQUNILDBCQUFNLGdCQUFOLEVBQXdCLElBQXhCLENBQTZCLGdCQUFnQixlQUFoQixDQUN6QiwwQkFEeUIsRUFFekIsTUFBTSxnQkFBTixFQUF3QixNQUF4QixHQUErQixDQUZOLEVBR3pCLGNBSHlCLEVBSXpCLG9CQUp5QixDQUE3QjtBQU1BO0FBQ0g7QUFDSjtBQUNELG1CQUFPLEtBQVA7QUFDSDs7Ozs7O0FBR0wsT0FBTyxPQUFQLEdBQWlCLGVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBwaWNreSBmcm9tICcuL2xpYi9waWNreS5qcyc7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdmlld0RhdGFIZWxwZXJzIGZyb20gJy4vdmlld0RhdGFIZWxwZXJzJztcblxuY2xhc3MgcGlja3kge1xuXG4gICAgc3RhdGljIGFkZENhbGVuZGFyKHN0YXRlLCBuYW1lLCBzdGFydERheSwgc3RhcnRNb250aCwgc3RhcnRZZWFyKSB7XG4gICAgICAgICBpZiAocGlja3kuaXNWYWxpZFBpY2t5KHN0YXRlKSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGNhbGVuZGFyczoge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jYWxlbmRhcnMsXG4gICAgICAgICAgICAgICAgICAgIC4uLntbbmFtZV0gOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IHN0YXJ0WWVhciB8fCBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoOiBzdGFydE1vbnRoIHx8IGN1cnJlbnREYXRlLmdldE1vbnRoKCkgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheTogc3RhcnREYXkgfHwgY3VycmVudERhdGUuZ2V0RGF0ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiBzdGFydFllYXIgfHwgY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb250aDogc3RhcnRNb250aCB8fCBjdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6IHN0YXJ0RGF5IHx8IGN1cnJlbnREYXRlLmdldERhdGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBpc1ZhbGlkUGlja3koc3RhdGUpIHtcbiAgICAgICAgaWYodHlwZW9mIHN0YXRlID09PSB0eXBlb2Yge30gJiYgdHlwZW9mIHN0YXRlLmNhbGVuZGFycyA9PT0gdHlwZW9mIFtdKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTm8gdmFsaWQgcGlja3kgZGF0YSBwYXNzZWQgaW4uJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q2FsZW5kYXJWaWV3RGF0YShzdGF0ZSwgbmFtZSkge1xuICAgICAgICBpZiAocGlja3kuaXNWYWxpZFBpY2t5KHN0YXRlKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsZW5kYXIgPSBzdGF0ZS5jYWxlbmRhcnNbbmFtZV07XG4gICAgICAgICAgICBpZiAoY2FsZW5kYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlld0RhdGFIZWxwZXJzLmdlbmVyYXRlTW9udGhWaWV3RGF0YShjYWxlbmRhci52aWV3Lm1vbnRoLCBjYWxlbmRhci52aWV3LnllYXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZXJlIGlzIG5vIGNhbGVuZGFyIHdpdGggdGhlIG5hbWU6ICR7bmFtZX0gaW4gdGhpcyBwaWNreSBvYmplY3QuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbW92ZUNhbGVuZGFyVmlld0ZvcndhcmRPbmVNb250aChzdGF0ZSwgbmFtZSkge1xuICAgICAgICBpZiAocGlja3kuaXNWYWxpZFBpY2t5KHN0YXRlKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsZW5kYXIgPSBzdGF0ZS5jYWxlbmRhcnNbbmFtZV07XG4gICAgICAgICAgICBpZiAoY2FsZW5kYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jYWxlbmRhcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi57W25hbWVdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uY2FsZW5kYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5jYWxlbmRhci52aWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb250aDogY2FsZW5kYXIudmlldy5tb250aCArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGVyZSBpcyBubyBjYWxlbmRhciB3aXRoIHRoZSBuYW1lOiAke25hbWV9IGluIHRoaXMgcGlja3kgb2JqZWN0LmApO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdlbmVyYXRlRGF0ZVBpY2tlcigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhbGVuZGFyczoge30sXG4gICAgICAgICAgICB2aWV3TW9kZTogJ21vbnRoJyxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmNvbnN0IGRhdGVQaWNrZXJEYXRhID0gcGlja3kuZ2VuZXJhdGVEYXRlUGlja2VyKCk7XG5jb25zb2xlLmxvZyhkYXRlUGlja2VyRGF0YS5jYWxlbmRhcnMubGVuZ3RoKTtcbmNvbnNvbGUubG9nKGRhdGVQaWNrZXJEYXRhKTtcblxuY29uc3QgbW9kaWZpZWREYXRlUGlja2VyRGF0YSA9IHBpY2t5LmFkZENhbGVuZGFyKGRhdGVQaWNrZXJEYXRhLCAnbGVmdCcsIDIwLCAxMCwgMjAxNik7XG5jb25zb2xlLmxvZyhtb2RpZmllZERhdGVQaWNrZXJEYXRhKTtcbmNvbnNvbGUubG9nKG1vZGlmaWVkRGF0ZVBpY2tlckRhdGEuY2FsZW5kYXJzLmxlbmd0aCk7XG5jb25zdCBtb2RpZmllZERhdGVQaWNrZXJEYXRhMiA9IHBpY2t5LmFkZENhbGVuZGFyKG1vZGlmaWVkRGF0ZVBpY2tlckRhdGEsICdyaWdodCcpO1xuY29uc29sZS5sb2cobW9kaWZpZWREYXRlUGlja2VyRGF0YTIpO1xuY29uc29sZS5sb2cobW9kaWZpZWREYXRlUGlja2VyRGF0YTIuY2FsZW5kYXJzLmxlbmd0aCk7XG4vL2NvbnNvbGUubG9nKHBpY2t5LmdldENhbGVuZGFyVmlld0RhdGEobW9kaWZpZWREYXRlUGlja2VyRGF0YTIsICdsZWZ0JykpO1xuY29uc29sZS5sb2cobW9kaWZpZWREYXRlUGlja2VyRGF0YTIuY2FsZW5kYXJzKTtcbmNvbnN0IG1vdmVkRGF0ZVBpY2tlckRhdGEgPSBwaWNreS5tb3ZlQ2FsZW5kYXJWaWV3Rm9yd2FyZE9uZU1vbnRoKG1vZGlmaWVkRGF0ZVBpY2tlckRhdGEyLCAnbGVmdCcpO1xuY29uc29sZS5sb2cobW92ZWREYXRlUGlja2VyRGF0YS5jYWxlbmRhcnMpO1xuLy9jb25zb2xlLmxvZyhwaWNreS5nZXRDYWxlbmRhclZpZXdEYXRhKG1vdmVkRGF0ZVBpY2tlckRhdGEsICdsZWZ0JykpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyB1dGlsIHtcbiAgICBzdGF0aWMgaXNMZWFwWWVhcih5ZWFyKSB7XG4gICAgICAgIGlmICh5ZWFyJTQgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyJTEwMCAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoeWVhciU0MDAgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGFCZWZvcmVCKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEueWVhciA8IGIueWVhciB8fCBhLm1vbnRoIDwgYi5tb250aCB8fCBhLmRheSA8IGIuZGF5O1xuICAgIH1cblxuICAgIHN0YXRpYyBhQWZ0ZXJCKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEueWVhciA+IGIueWVhciB8fCBhLm1vbnRoID4gYi5tb250aCB8fCBhLmRheSA+IGIuZGF5O1xuICAgIH1cblxuXG4gICAgc3RhdGljIGdldFdlZWtkYXkoZGF5LCBtb250aCwgeWVhcikge1xuICAgICAgICAvLyBJbXBsZW1lbnRpbmcgWmVsbGVyJ3MgY29uZ3J1ZW5jZVxuICAgICAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9aZWxsZXIlMjdzX2NvbmdydWVuY2VcblxuICAgICAgICBjb25zdCBxID0gZGF5O1xuICAgICAgICBsZXQgbTtcbiAgICAgICAgbGV0IHBvdGVudGlhbGx5U2hpZnRlZFllYXI7XG4gICAgICAgIGlmIChtb250aCA8PSAyKSB7XG4gICAgICAgICAgICBtID0gbW9udGgrMTI7XG4gICAgICAgICAgICBwb3RlbnRpYWxseVNoaWZ0ZWRZZWFyID0geWVhci0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbSA9IG1vbnRoO1xuICAgICAgICAgICAgcG90ZW50aWFsbHlTaGlmdGVkWWVhciA9IHllYXI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgSyA9IHBvdGVudGlhbGx5U2hpZnRlZFllYXIgJSAxMDA7XG4gICAgICAgIGNvbnN0IEogPSBNYXRoLmZsb29yKHBvdGVudGlhbGx5U2hpZnRlZFllYXIgLyAxMDApO1xuXG4gICAgICAgIGNvbnN0IGggPSAocSArIE1hdGguZmxvb3IoMTMqKG0gKyAxKSAvIDUpICsgSyArIE1hdGguZmxvb3IoSy80KSArIE1hdGguZmxvb3IoSi80KSArIDUqSikgJSA3O1xuXG4gICAgICAgIGNvbnN0IGQgPSAoKGgrNSkgJSA3KTtcbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEZvbGxvd2luZ01vbnRoTnVtYmVyKG1vbnRoKSB7XG4gICAgICAgIGlmIChtb250aCA9PT0gMTIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1vbnRoICsgMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRQcmVjZWRpbmdNb250aE51bWJlcihtb250aCkge1xuICAgICAgICBpZiAobW9udGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAxMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtb250aCAtIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0RGF5c0luTW9udGgobW9udGgsIHllYXIpIHtcbiAgICAgICAgY29uc3QgbW9udGhMZW5ndGhzID0gW1xuICAgICAgICAgICAgMzEsIHV0aWwuaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiBtb250aExlbmd0aHNbbW9udGgtMV07XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB1dGlsIGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIHZpZXdEYXRhSGVscGVycyB7XG5cbiAgICBzdGF0aWMgY3JlYXRlRGF5T2JqZWN0KGRheSwgd2Vla2RheSwgbW9udGgsIHllYXIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRheSwgd2Vla2RheSwgbW9udGgsIHllYXJcbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZW5lcmF0ZU1vbnRoVmlld0RhdGEobW9udGgsIHllYXIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRXZWVrZGF5ID0gdXRpbC5nZXRXZWVrZGF5KDEsIG1vbnRoLCB5ZWFyKTtcblxuICAgICAgICBjb25zdCBwcmVjZWRpbmdNb250aCA9IHV0aWwuZ2V0UHJlY2VkaW5nTW9udGhOdW1iZXIobW9udGgpO1xuICAgICAgICBjb25zdCB5ZWFyT2ZQcmVjZWRpbmdNb250aCA9IHByZWNlZGluZ01vbnRoID09PSAxMiA/IHllYXItMSA6IHllYXI7XG4gICAgICAgIGNvbnN0IGRheXNJblByZWNlZGluZ01vbnRoID0gdXRpbC5nZXREYXlzSW5Nb250aChwcmVjZWRpbmdNb250aCwgeWVhcik7XG5cbiAgICAgICAgY29uc3QgZm9sbG93aW5nTW9udGggPSB1dGlsLmdldEZvbGxvd2luZ01vbnRoTnVtYmVyKG1vbnRoKTtcbiAgICAgICAgY29uc3QgeWVhck9mRm9sbG93aW5nTW9udGggPSBmb2xsb3dpbmdNb250aCA9PT0gMSA/IHllYXIrMSA6IHllYXI7XG5cblxuICAgICAgICBjb25zdCBkYXlzSW5DdXJyZW50TW9udGggPSB1dGlsLmdldERheXNJbk1vbnRoKG1vbnRoLCB5ZWFyKTtcblxuICAgICAgICBjb25zdCB3ZWVrcyA9IFtdO1xuXG4gICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IDE7XG4gICAgICAgIGxldCBjdXJyZW50V2Vla0luZGV4ID0gMDtcbiAgICAgICAgbGV0IGN1cnJlbnREYXlJbkZvbGxvd2luZ01vbnRoID0gMTtcblxuICAgICAgICB3ZWVrc1tjdXJyZW50V2Vla0luZGV4XSA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnRXZWVrZGF5OyBpKyspIHtcbiAgICAgICAgICAgIHdlZWtzW2N1cnJlbnRXZWVrSW5kZXhdLnB1c2godmlld0RhdGFIZWxwZXJzLmNyZWF0ZURheU9iamVjdChcbiAgICAgICAgICAgICAgICBkYXlzSW5QcmVjZWRpbmdNb250aCAtIHN0YXJ0V2Vla2RheSArIDEgKyBpLFxuICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgcHJlY2VkaW5nTW9udGgsXG4gICAgICAgICAgICAgICAgeWVhck9mUHJlY2VkaW5nTW9udGhcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlKHdlZWtzW2N1cnJlbnRXZWVrSW5kZXhdLmxlbmd0aCA8IDcgfHwgY3VycmVudERhdGUgPD0gZGF5c0luQ3VycmVudE1vbnRoKSB7XG4gICAgICAgICAgICBpZih3ZWVrc1tjdXJyZW50V2Vla0luZGV4XS5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50V2Vla0luZGV4Kys7XG4gICAgICAgICAgICAgICAgd2Vla3NbY3VycmVudFdlZWtJbmRleF0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGN1cnJlbnREYXRlIDw9IGRheXNJbkN1cnJlbnRNb250aCkge1xuICAgICAgICAgICAgICAgIHdlZWtzW2N1cnJlbnRXZWVrSW5kZXhdLnB1c2godmlld0RhdGFIZWxwZXJzLmNyZWF0ZURheU9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudERhdGUsXG4gICAgICAgICAgICAgICAgICAgIHdlZWtzW2N1cnJlbnRXZWVrSW5kZXhdLmxlbmd0aCsxLFxuICAgICAgICAgICAgICAgICAgICBtb250aCxcbiAgICAgICAgICAgICAgICAgICAgeWVhclxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlZWtzW2N1cnJlbnRXZWVrSW5kZXhdLnB1c2godmlld0RhdGFIZWxwZXJzLmNyZWF0ZURheU9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudERheUluRm9sbG93aW5nTW9udGgsXG4gICAgICAgICAgICAgICAgICAgIHdlZWtzW2N1cnJlbnRXZWVrSW5kZXhdLmxlbmd0aCsxLFxuICAgICAgICAgICAgICAgICAgICBmb2xsb3dpbmdNb250aCxcbiAgICAgICAgICAgICAgICAgICAgeWVhck9mRm9sbG93aW5nTW9udGhcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF5SW5Gb2xsb3dpbmdNb250aCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3ZWVrcztcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmlld0RhdGFIZWxwZXJzOyJdfQ==
