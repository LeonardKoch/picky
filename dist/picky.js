(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _picky = require('./lib/picky.js');

var _picky2 = _interopRequireDefault(_picky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./lib/picky.js":2}],2:[function(require,module,exports){
'use strict';

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _viewDataHelpers = require('./viewDataHelpers.js');

var _viewDataHelpers2 = _interopRequireDefault(_viewDataHelpers);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

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
                        selection: {
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
        key: 'constrainViewToView',
        value: function constrainViewToView(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
            return picky.addCalendarConstraint(state, agentCalendarName, 'view', gateCalendarName, 'view', comparator, behaviour);
        }
    }, {
        key: 'constrainViewToSelection',
        value: function constrainViewToSelection(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
            return picky.addCalendarConstraint(state, agentCalendarName, 'view', gateCalendarName, 'selection', comparator, behaviour);
        }
    }, {
        key: 'constrainSelectionToView',
        value: function constrainSelectionToView(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
            return picky.addCalendarConstraint(state, agentCalendarName, 'selection', gateCalendarName, 'view', comparator, behaviour);
        }
    }, {
        key: 'constrainSelectionToSelection',
        value: function constrainSelectionToSelection(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
            return picky.addCalendarConstraint(state, agentCalendarName, 'selection', gateCalendarName, 'selection', comparator, behaviour);
        }
    }, {
        key: 'constrainViewToDate',
        value: function constrainViewToDate(state, agentCalendarName, date, comparator, behaviour, keepLive) {
            return picky.addCalendarConstraint(state, agentCalendarName, 'selection', keepLive ? date : Object.assign({}, date), comparator, behaviour);
        }
    }, {
        key: 'constrainSelectionToDate',
        value: function constrainSelectionToDate(state, agentCalendarName, date, comparator, behaviour, keepLive) {
            return picky.addCalendarConstraint(state, agentCalendarName, 'selection', keepLive ? date : Object.assign({}, date), comparator, behaviour);
        }
    }, {
        key: 'addCalendarConstraint',
        value: function addCalendarConstraint(state, agentCalendarName, agentProperty, gateCalendarName, gateProperty) {
            var comparator = arguments.length <= 5 || arguments[5] === undefined ? '<=' : arguments[5];
            var behaviour = arguments.length <= 6 || arguments[6] === undefined ? 'limit' : arguments[6];

            return picky.addConstraint(state, {
                agent: {
                    calendar: agentCalendarName,
                    property: agentProperty
                },
                gate: {
                    type: 'calendar',
                    calendar: gateCalendarName,
                    property: gateProperty
                },
                comparator: comparator,
                behaviour: behaviour
            });
        }
    }, {
        key: 'addDateConstraint',
        value: function addDateConstraint(state, agentCalendarName, agentProperty, date) {
            var comparator = arguments.length <= 4 || arguments[4] === undefined ? '<=' : arguments[4];
            var behaviour = arguments.length <= 5 || arguments[5] === undefined ? 'limit' : arguments[5];

            return picky.addConstraint(state, {
                agent: {
                    calendar: agentCalendarName,
                    property: agentProperty
                },
                gate: {
                    type: 'date',
                    date: date
                },
                comparator: comparator,
                behaviour: behaviour
            });
        }
    }, {
        key: 'addConstraint',
        value: function addConstraint(state, constraint) {
            if (picky.isValidPicky(state)) {
                return _extends({}, state, {
                    constraints: [].concat(_toConsumableArray(state.constraints), [constraint])
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'setCalendar',
        value: function setCalendar(state, name, calendar) {
            if (picky.isValidPicky(state)) {
                return _extends({}, state, {
                    calendars: _extends({}, state.calendars, _defineProperty({}, name, calendar))
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'getGateValue',
        value: function getGateValue(state, constraint) {
            var gate = constraint.gate;
            switch (gate.type) {
                case 'calendar':
                    return state.calendars[gate.calendar][gate.property];
                    break;
                case 'date':
                    return gate.date;
                    break;
            }
        }
    }, {
        key: 'checkConstraintViolation',
        value: function checkConstraintViolation(state, constraint, calendar, property, value) {
            if (constraint.agent.calendar === calendar && constraint.agent.property === property) {
                // Is applicable constraint
                var constraintValue = picky.getGateValue(state, constraint);

                var valueBeforeGate = _util2.default.aBeforeB(value, constraintValue);
                var valueAfterGate = _util2.default.aAfterB(value, constraintValue);
                var valueEqualGate = !valueBeforeGate && !valueAfterGate;

                var valueIsValid = void 0;
                switch (constraint.comparator) {
                    case '<':
                        valueIsValid = valueBeforeGate;
                        break;
                    case '<=':
                        valueIsValid = valueBeforeGate || valueEqualGate;
                        break;
                    case '>':
                        valueIsValid = valueAfterGate;
                        break;
                    case '>=':
                        valueIsValid = valueAfterGate || valueEqualGate;
                        break;
                    case '=':
                    case '==':
                    case '===':
                        valueIsValid = valueEqualGate;
                        break;
                    case '!=':
                    case '!==':
                        valueIsValid = !valueEqualGate;
                        break;
                    default:
                        valueIsValid = false;
                }

                if (valueIsValid) {
                    // Value doesn't violate constraint.
                    return value;
                } else {
                    switch (constraint.behaviour) {
                        case 'limit':
                            // Return a copy of the constrained value.
                            return Object.assign({}, constraintValue);
                            break;
                        case 'cancel':
                            return Object.assign({}, state.calendars[calendar][property]);
                            break;
                        default:
                            return Object.assign({}, state.calendars[calendar][property]);
                    }
                }
            } else {
                // Is not applicable constraint
                return value;
            }
        }
    }, {
        key: 'validateChangeAgainstConstraints',
        value: function validateChangeAgainstConstraints(state, calendarName, property, value) {
            return state.constraints.reduce(function (currentView, constraint) {
                return picky.checkConstraintViolation(state, constraint, calendarName, property, currentView);
            }, value);
        }
    }, {
        key: 'setCalendarView',
        value: function setCalendarView(state, calendarName, view) {
            if (picky.isValidPicky(state)) {
                var constrainedView = picky.validateChangeAgainstConstraints(state, calendarName, 'view', view);

                return picky.setCalendar(state, calendarName, _extends({}, state.calendars[calendarName], {
                    view: constrainedView
                }));
            } else {
                return null;
            }
        }
    }, {
        key: 'setCalendarViewDay',
        value: function setCalendarViewDay(state, name, day) {
            if (picky.isValidPicky(state)) {
                return picky.setCalendarView(state, name, _extends({}, state.calendars[name].view, {
                    day: day
                }));
            } else {
                return null;
            }
        }
    }, {
        key: 'setCalendarViewMonth',
        value: function setCalendarViewMonth(state, name, month) {
            if (picky.isValidPicky(state)) {
                return picky.setCalendarView(state, name, _extends({}, state.calendars[name].view, {
                    month: month
                }));
            } else {
                return null;
            }
        }
    }, {
        key: 'setCalendarViewYear',
        value: function setCalendarViewYear(state, name, year) {
            if (picky.isValidPicky(state)) {
                return picky.setCalendarView(state, name, _extends({}, state.calendars[name].view, {
                    year: year
                }));
            } else {
                return null;
            }
        }
    }, {
        key: 'setCalendarSelection',
        value: function setCalendarSelection(state, name, selection) {
            if (picky.isValidPicky(state)) {
                return picky.setCalendar(state, name, _extends({}, state.calendars[name], {
                    selection: selection
                }));
            } else {
                return null;
            }
        }
    }, {
        key: 'setCalendarSelectionDay',
        value: function setCalendarSelectionDay(state, name, day) {
            if (picky.isValidPicky(state)) {
                return picky.setCalendarSelection(state, name, _extends({}, state.calendars[name].selection, {
                    day: day
                }));
            } else {
                return null;
            }
        }
    }, {
        key: 'setCalendarSelectionMonth',
        value: function setCalendarSelectionMonth(state, name, month) {
            if (picky.isValidPicky(state)) {
                return picky.setCalendarSelection(state, name, _extends({}, state.calendars[name].selection, {
                    month: month
                }));
            } else {
                return null;
            }
        }
    }, {
        key: 'setCalendarSelectionYear',
        value: function setCalendarSelectionYear(state, name, year) {
            if (picky.isValidPicky(state)) {
                return picky.setCalendarSelection(state, name, _extends({}, state.calendars[name].selection, {
                    year: year
                }));
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
        key: 'getCalendarMonthViewData',
        value: function getCalendarMonthViewData(state, name) {
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
        key: 'getCalendarYearViewData',
        value: function getCalendarYearViewData(state, name) {
            if (picky.isValidPicky(state)) {
                var calendar = state.calendars[name];
                if (calendar) {
                    return _viewDataHelpers2.default.generateYearViewData(calendar.view.year);
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
                    return picky.setCalendarView(state, name, _util2.default.getDateOfFollowingMonth(calendar.view));
                } else {
                    console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
                    return state;
                }
            } else {
                return null;
            }
        }
    }, {
        key: 'moveCalendarViewBackwardOneMonth',
        value: function moveCalendarViewBackwardOneMonth(state, name) {
            if (picky.isValidPicky(state)) {
                var calendar = state.calendars[name];
                if (calendar) {
                    return picky.setCalendarView(state, name, _util2.default.getDateOfPrecedingMonth(calendar.view));
                } else {
                    console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
                    return state;
                }
            } else {
                return null;
            }
        }
    }, {
        key: 'create',
        value: function create() {
            return {
                calendars: {},
                constraints: [],
                viewMode: 'month'
            };
        }
    }]);

    return picky;
}();

var datePickerData = picky.create();

var modifiedDatePickerData = picky.addCalendar(datePickerData, 'left', 20, 11, 2016);
var modifiedDatePickerData2 = picky.addCalendar(modifiedDatePickerData, 'right', 20, 9, 2016);

console.log(picky.setCalendarViewYear(modifiedDatePickerData2, 'left', 2018));

var addedConstraintPicker1 = picky.constrainViewToView(modifiedDatePickerData2, 'left', 'right', '>=');
console.log(addedConstraintPicker1);
var addedConstraintPicker2 = picky.constrainViewToSelection(addedConstraintPicker1, 'left', 'right', '==', 'limit');
console.log(addedConstraintPicker2);
var addedConstraintPicker3 = picky.constrainSelectionToSelection(addedConstraintPicker2, 'left', 'right', '==', 'cancel');
console.log(addedConstraintPicker3);
var addedConstraintPicker4 = picky.constrainSelectionToView(addedConstraintPicker3, 'left', 'right', '==');
console.log(addedConstraintPicker4);
var addedConstraintPicker5 = picky.constrainViewToDate(addedConstraintPicker4, 'right', { day: 5, month: 8, year: 2020 }, '<=', 'cancel');
console.log(addedConstraintPicker5);
var addedConstraintPicker6 = picky.constrainSelectionToDate(addedConstraintPicker5, 'left', { day: 5, month: 8, year: 2010 }, '>=', 'limit', true);
console.log(addedConstraintPicker6);

},{"./util.js":3,"./viewDataHelpers.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports.default = util;

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

},{"./util":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYlxccGlja3kuanMiLCJsaWJcXHV0aWwuanMiLCJsaWJcXHZpZXdEYXRhSGVscGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SSxBQUVNOzs7Ozs7O29DLEFBRWlCLE8sQUFBTyxNLEFBQU0sVSxBQUFVLFksQUFBWSxXQUFXLEFBQzVEO2dCQUFJLE1BQUEsQUFBTSxhQUFWLEFBQUksQUFBbUIsUUFBUSxBQUM1QjtvQkFBTSxjQUFjLElBQXBCLEFBQW9CLEFBQUksQUFFeEI7O29DQUFBLEFBQ087NENBRUksTUFEUCxBQUNhLCtCQURiLEFBRVM7OEJBQVEsQUFDSCxBQUNOOztrQ0FDVSxhQUFhLFlBRGpCLEFBQ2lCLEFBQVksQUFDL0I7bUNBQU8sY0FBYyxZQUFBLEFBQVksYUFGL0IsQUFFNEMsQUFDOUM7aUNBQUssWUFBWSxZQUxaLEFBRUgsQUFDRixBQUVpQixBQUFZLEFBRWpDOzs7a0NBQ1UsYUFBYSxZQURaLEFBQ1ksQUFBWSxBQUMvQjttQ0FBTyxjQUFjLFlBQUEsQUFBWSxhQUYxQixBQUV1QyxBQUM5QztpQ0FBSyxZQUFZLFlBakJwQyxBQUdHLEFBRUksQUFFaUIsQUFDVCxBQU1XLEFBQ1AsQUFFaUIsQUFBWSxBQUtoRDs7OzttQkFBTSxBQUNIO3VCQUFBLEFBQU8sQUFDVixBQUNKOzs7Ozs0QyxBQUUwQixPLEFBQU8sbUIsQUFBbUIsa0IsQUFBa0IsWSxBQUFZLFdBQVcsQUFDMUY7bUJBQU8sTUFBQSxBQUFNLHNCQUFOLEFBQTRCLE9BQTVCLEFBQW1DLG1CQUFuQyxBQUFzRCxRQUF0RCxBQUE4RCxrQkFBOUQsQUFBZ0YsUUFBaEYsQUFBd0YsWUFBL0YsQUFBTyxB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ZUFBaEIsQ0FDekIsV0FEeUIsRUFFekIsTUFBTSxnQkFBTixFQUF3QixNQUF4QixHQUErQixDQUZOLEVBR3pCLEtBSHlCLEVBSXpCLElBSnlCLENBQTdCO0FBTUE7QUFDSCxpQkFSRCxNQVFPO0FBQ0gsMEJBQU0sZ0JBQU4sRUFBd0IsSUFBeEIsQ0FBNkIsZ0JBQWdCLGVBQWhCLENBQ3pCLDBCQUR5QixFQUV6QixNQUFNLGdCQUFOLEVBQXdCLE1BQXhCLEdBQStCLENBRk4sRUFHekIsY0FIeUIsRUFJekIsb0JBSnlCLENBQTdCO0FBTUE7QUFDSDtBQUNKO0FBQ0QsbUJBQU87QUFDSCx1QkFBTyxLQURKO0FBRUgsc0JBQU0sSUFGSDtBQUdILHVCQUFPO0FBSEosYUFBUDtBQUtIOzs7Ozs7QUFHTCxPQUFPLE9BQVAsR0FBaUIsZUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHBpY2t5IGZyb20gJy4vbGliL3BpY2t5LmpzJzsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgdmlld0RhdGFIZWxwZXJzIGZyb20gJy4vdmlld0RhdGFIZWxwZXJzLmpzJztcclxuaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlsLmpzJztcclxuXHJcbmNsYXNzIHBpY2t5IHtcclxuXHJcbiAgICBzdGF0aWMgYWRkQ2FsZW5kYXIoc3RhdGUsIG5hbWUsIHN0YXJ0RGF5LCBzdGFydE1vbnRoLCBzdGFydFllYXIpIHtcclxuICAgICAgICAgaWYgKHBpY2t5LmlzVmFsaWRQaWNreShzdGF0ZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUuY2FsZW5kYXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLntbbmFtZV0gOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IHN0YXJ0WWVhciB8fCBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6IHN0YXJ0TW9udGggfHwgY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6IHN0YXJ0RGF5IHx8IGN1cnJlbnREYXRlLmdldERhdGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IHN0YXJ0WWVhciB8fCBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGg6IHN0YXJ0TW9udGggfHwgY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXk6IHN0YXJ0RGF5IHx8IGN1cnJlbnREYXRlLmdldERhdGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvbnN0cmFpblZpZXdUb1ZpZXcoc3RhdGUsIGFnZW50Q2FsZW5kYXJOYW1lLCBnYXRlQ2FsZW5kYXJOYW1lLCBjb21wYXJhdG9yLCBiZWhhdmlvdXIpIHtcclxuICAgICAgICByZXR1cm4gcGlja3kuYWRkQ2FsZW5kYXJDb25zdHJhaW50KHN0YXRlLCBhZ2VudENhbGVuZGFyTmFtZSwgJ3ZpZXcnLCBnYXRlQ2FsZW5kYXJOYW1lLCAndmlldycsIGNvbXBhcmF0b3IsIGJlaGF2aW91cik7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29uc3RyYWluVmlld1RvU2VsZWN0aW9uKHN0YXRlLCBhZ2VudENhbGVuZGFyTmFtZSwgZ2F0ZUNhbGVuZGFyTmFtZSwgY29tcGFyYXRvciwgYmVoYXZpb3VyKSB7XHJcbiAgICAgICAgcmV0dXJuIHBpY2t5LmFkZENhbGVuZGFyQ29uc3RyYWludChzdGF0ZSwgYWdlbnRDYWxlbmRhck5hbWUsICd2aWV3JywgZ2F0ZUNhbGVuZGFyTmFtZSwgJ3NlbGVjdGlvbicsIGNvbXBhcmF0b3IsIGJlaGF2aW91cik7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29uc3RyYWluU2VsZWN0aW9uVG9WaWV3KHN0YXRlLCBhZ2VudENhbGVuZGFyTmFtZSwgZ2F0ZUNhbGVuZGFyTmFtZSwgY29tcGFyYXRvciwgYmVoYXZpb3VyKSB7XHJcbiAgICAgICAgcmV0dXJuIHBpY2t5LmFkZENhbGVuZGFyQ29uc3RyYWludChzdGF0ZSwgYWdlbnRDYWxlbmRhck5hbWUsICdzZWxlY3Rpb24nLCBnYXRlQ2FsZW5kYXJOYW1lLCAndmlldycsIGNvbXBhcmF0b3IsIGJlaGF2aW91cik7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29uc3RyYWluU2VsZWN0aW9uVG9TZWxlY3Rpb24oc3RhdGUsIGFnZW50Q2FsZW5kYXJOYW1lLCBnYXRlQ2FsZW5kYXJOYW1lLCBjb21wYXJhdG9yLCBiZWhhdmlvdXIpIHtcclxuICAgICAgICByZXR1cm4gcGlja3kuYWRkQ2FsZW5kYXJDb25zdHJhaW50KHN0YXRlLCBhZ2VudENhbGVuZGFyTmFtZSwgJ3NlbGVjdGlvbicsIGdhdGVDYWxlbmRhck5hbWUsICdzZWxlY3Rpb24nLCBjb21wYXJhdG9yLCBiZWhhdmlvdXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjb25zdHJhaW5WaWV3VG9EYXRlKHN0YXRlLCBhZ2VudENhbGVuZGFyTmFtZSwgZGF0ZSwgY29tcGFyYXRvciwgYmVoYXZpb3VyLCBrZWVwTGl2ZSkge1xyXG4gICAgICAgIHJldHVybiBwaWNreS5hZGRDYWxlbmRhckNvbnN0cmFpbnQoc3RhdGUsIGFnZW50Q2FsZW5kYXJOYW1lLCAnc2VsZWN0aW9uJywga2VlcExpdmUgPyBkYXRlIDogT2JqZWN0LmFzc2lnbih7fSwgZGF0ZSksIGNvbXBhcmF0b3IsIGJlaGF2aW91cik7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29uc3RyYWluU2VsZWN0aW9uVG9EYXRlKHN0YXRlLCBhZ2VudENhbGVuZGFyTmFtZSwgZGF0ZSwgY29tcGFyYXRvciwgYmVoYXZpb3VyLCBrZWVwTGl2ZSkge1xyXG4gICAgICAgIHJldHVybiBwaWNreS5hZGRDYWxlbmRhckNvbnN0cmFpbnQoc3RhdGUsIGFnZW50Q2FsZW5kYXJOYW1lLCAnc2VsZWN0aW9uJywga2VlcExpdmUgPyBkYXRlIDogT2JqZWN0LmFzc2lnbih7fSwgZGF0ZSksIGNvbXBhcmF0b3IsIGJlaGF2aW91cik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFkZENhbGVuZGFyQ29uc3RyYWludChzdGF0ZSwgYWdlbnRDYWxlbmRhck5hbWUsIGFnZW50UHJvcGVydHksIGdhdGVDYWxlbmRhck5hbWUsIGdhdGVQcm9wZXJ0eSwgY29tcGFyYXRvciA9ICc8PScsIGJlaGF2aW91ciA9ICdsaW1pdCcpIHtcclxuICAgICAgICByZXR1cm4gcGlja3kuYWRkQ29uc3RyYWludChzdGF0ZSwge1xyXG4gICAgICAgICAgICBhZ2VudDoge1xyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXI6IGFnZW50Q2FsZW5kYXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IGFnZW50UHJvcGVydHlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2F0ZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhbGVuZGFyJyxcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyOiBnYXRlQ2FsZW5kYXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IGdhdGVQcm9wZXJ0eVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wYXJhdG9yOiBjb21wYXJhdG9yLFxyXG4gICAgICAgICAgICBiZWhhdmlvdXI6IGJlaGF2aW91clxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhZGREYXRlQ29uc3RyYWludChzdGF0ZSwgYWdlbnRDYWxlbmRhck5hbWUsIGFnZW50UHJvcGVydHksIGRhdGUsIGNvbXBhcmF0b3IgPSAnPD0nLCBiZWhhdmlvdXIgPSAnbGltaXQnKSB7XHJcbiAgICAgICAgcmV0dXJuIHBpY2t5LmFkZENvbnN0cmFpbnQoc3RhdGUsIHtcclxuICAgICAgICAgICAgYWdlbnQ6IHtcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyOiBhZ2VudENhbGVuZGFyTmFtZSxcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBhZ2VudFByb3BlcnR5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdhdGU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICAgICAgICAgIGRhdGU6IGRhdGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGFyYXRvcjogY29tcGFyYXRvcixcclxuICAgICAgICAgICAgYmVoYXZpb3VyOiBiZWhhdmlvdXJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYWRkQ29uc3RyYWludChzdGF0ZSwgY29uc3RyYWludCkge1xyXG4gICAgICAgICBpZiAocGlja3kuaXNWYWxpZFBpY2t5KHN0YXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBjb25zdHJhaW50czogW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNvbnN0cmFpbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldENhbGVuZGFyKHN0YXRlLCBuYW1lLCBjYWxlbmRhcikge1xyXG4gICAgICAgIGlmIChwaWNreS5pc1ZhbGlkUGlja3koc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLmNhbGVuZGFycyxcclxuICAgICAgICAgICAgICAgICAgICAuLi57W25hbWVdIDogY2FsZW5kYXJ9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRHYXRlVmFsdWUoc3RhdGUsIGNvbnN0cmFpbnQpIHtcclxuICAgICAgICBjb25zdCBnYXRlID0gY29uc3RyYWludC5nYXRlO1xyXG4gICAgICAgIHN3aXRjaChnYXRlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnY2FsZW5kYXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmNhbGVuZGFyc1tnYXRlLmNhbGVuZGFyXVtnYXRlLnByb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBnYXRlLmRhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNoZWNrQ29uc3RyYWludFZpb2xhdGlvbihzdGF0ZSwgY29uc3RyYWludCwgY2FsZW5kYXIsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmIChjb25zdHJhaW50LmFnZW50LmNhbGVuZGFyID09PSBjYWxlbmRhciAmJiBjb25zdHJhaW50LmFnZW50LnByb3BlcnR5ID09PSBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAvLyBJcyBhcHBsaWNhYmxlIGNvbnN0cmFpbnRcclxuICAgICAgICAgICAgY29uc3QgY29uc3RyYWludFZhbHVlID0gcGlja3kuZ2V0R2F0ZVZhbHVlKHN0YXRlLCBjb25zdHJhaW50KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlQmVmb3JlR2F0ZSA9IHV0aWwuYUJlZm9yZUIodmFsdWUsIGNvbnN0cmFpbnRWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlQWZ0ZXJHYXRlID0gdXRpbC5hQWZ0ZXJCKHZhbHVlLCBjb25zdHJhaW50VmFsdWUpO1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZUVxdWFsR2F0ZSA9ICF2YWx1ZUJlZm9yZUdhdGUgJiYgIXZhbHVlQWZ0ZXJHYXRlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlSXNWYWxpZDtcclxuICAgICAgICAgICAgc3dpdGNoIChjb25zdHJhaW50LmNvbXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJzwnOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSXNWYWxpZCA9IHZhbHVlQmVmb3JlR2F0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzw9JzpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUlzVmFsaWQgPSB2YWx1ZUJlZm9yZUdhdGUgfHwgdmFsdWVFcXVhbEdhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICc+JzpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUlzVmFsaWQgPSB2YWx1ZUFmdGVyR2F0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJz49JzpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUlzVmFsaWQgPSB2YWx1ZUFmdGVyR2F0ZSB8fCB2YWx1ZUVxdWFsR2F0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJz0nOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnPT0nOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnPT09JzpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUlzVmFsaWQgPSB2YWx1ZUVxdWFsR2F0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJyE9JzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJyE9PSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJc1ZhbGlkID0gIXZhbHVlRXF1YWxHYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlSXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVmFsdWUgZG9lc24ndCB2aW9sYXRlIGNvbnN0cmFpbnQuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbnN0cmFpbnQuYmVoYXZpb3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGltaXQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBjb25zdHJhaW5lZCB2YWx1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbnN0cmFpbnRWYWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2FuY2VsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNhbGVuZGFyc1tjYWxlbmRhcl1bcHJvcGVydHldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNhbGVuZGFyc1tjYWxlbmRhcl1bcHJvcGVydHldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJcyBub3QgYXBwbGljYWJsZSBjb25zdHJhaW50XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHZhbGlkYXRlQ2hhbmdlQWdhaW5zdENvbnN0cmFpbnRzKHN0YXRlLCBjYWxlbmRhck5hbWUsIHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5jb25zdHJhaW50cy5yZWR1Y2UoKGN1cnJlbnRWaWV3LCBjb25zdHJhaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGlja3kuY2hlY2tDb25zdHJhaW50VmlvbGF0aW9uKHN0YXRlLCBjb25zdHJhaW50LCBjYWxlbmRhck5hbWUsIHByb3BlcnR5LCBjdXJyZW50Vmlldyk7XHJcbiAgICAgICAgfSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZXRDYWxlbmRhclZpZXcoc3RhdGUsIGNhbGVuZGFyTmFtZSwgdmlldykge1xyXG4gICAgICAgIGlmIChwaWNreS5pc1ZhbGlkUGlja3koc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnN0cmFpbmVkVmlldyA9IHBpY2t5LnZhbGlkYXRlQ2hhbmdlQWdhaW5zdENvbnN0cmFpbnRzKHN0YXRlLCBjYWxlbmRhck5hbWUsICd2aWV3Jywgdmlldyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGlja3kuc2V0Q2FsZW5kYXIoc3RhdGUsIGNhbGVuZGFyTmFtZSwge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUuY2FsZW5kYXJzW2NhbGVuZGFyTmFtZV0sXHJcbiAgICAgICAgICAgICAgICB2aWV3OiBjb25zdHJhaW5lZFZpZXdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHNldENhbGVuZGFyVmlld0RheShzdGF0ZSwgbmFtZSwgZGF5KSB7XHJcbiAgICAgICAgaWYgKHBpY2t5LmlzVmFsaWRQaWNreShzdGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBpY2t5LnNldENhbGVuZGFyVmlldyhzdGF0ZSwgbmFtZSwge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUuY2FsZW5kYXJzW25hbWVdLnZpZXcsXHJcbiAgICAgICAgICAgICAgICBkYXk6IGRheVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgc2V0Q2FsZW5kYXJWaWV3TW9udGgoc3RhdGUsIG5hbWUsIG1vbnRoKSB7XHJcbiAgICAgICAgaWYgKHBpY2t5LmlzVmFsaWRQaWNreShzdGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBpY2t5LnNldENhbGVuZGFyVmlldyhzdGF0ZSwgbmFtZSwge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUuY2FsZW5kYXJzW25hbWVdLnZpZXcsXHJcbiAgICAgICAgICAgICAgICBtb250aDogbW9udGhcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHNldENhbGVuZGFyVmlld1llYXIoc3RhdGUsIG5hbWUsIHllYXIpIHtcclxuICAgICAgICBpZiAocGlja3kuaXNWYWxpZFBpY2t5KHN0YXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGlja3kuc2V0Q2FsZW5kYXJWaWV3KHN0YXRlLCBuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jYWxlbmRhcnNbbmFtZV0udmlldyxcclxuICAgICAgICAgICAgICAgIHllYXI6IHllYXJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZXRDYWxlbmRhclNlbGVjdGlvbihzdGF0ZSwgbmFtZSwgc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHBpY2t5LmlzVmFsaWRQaWNreShzdGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBpY2t5LnNldENhbGVuZGFyKHN0YXRlLCBuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jYWxlbmRhcnNbbmFtZV0sXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHNlbGVjdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgc2V0Q2FsZW5kYXJTZWxlY3Rpb25EYXkoc3RhdGUsIG5hbWUsIGRheSkge1xyXG4gICAgICAgIGlmIChwaWNreS5pc1ZhbGlkUGlja3koc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwaWNreS5zZXRDYWxlbmRhclNlbGVjdGlvbihzdGF0ZSwgbmFtZSwge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUuY2FsZW5kYXJzW25hbWVdLnNlbGVjdGlvbixcclxuICAgICAgICAgICAgICAgIGRheTogZGF5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBzZXRDYWxlbmRhclNlbGVjdGlvbk1vbnRoKHN0YXRlLCBuYW1lLCBtb250aCkge1xyXG4gICAgICAgIGlmIChwaWNreS5pc1ZhbGlkUGlja3koc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwaWNreS5zZXRDYWxlbmRhclNlbGVjdGlvbihzdGF0ZSwgbmFtZSwge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUuY2FsZW5kYXJzW25hbWVdLnNlbGVjdGlvbixcclxuICAgICAgICAgICAgICAgIG1vbnRoOiBtb250aFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgc2V0Q2FsZW5kYXJTZWxlY3Rpb25ZZWFyKHN0YXRlLCBuYW1lLCB5ZWFyKSB7XHJcbiAgICAgICAgaWYgKHBpY2t5LmlzVmFsaWRQaWNreShzdGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBpY2t5LnNldENhbGVuZGFyU2VsZWN0aW9uKHN0YXRlLCBuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZS5jYWxlbmRhcnNbbmFtZV0uc2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgeWVhcjogeWVhclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBzdGF0aWMgaXNWYWxpZFBpY2t5KHN0YXRlKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIHN0YXRlID09PSB0eXBlb2Yge30gJiYgdHlwZW9mIHN0YXRlLmNhbGVuZGFycyA9PT0gdHlwZW9mIFtdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTm8gdmFsaWQgcGlja3kgZGF0YSBwYXNzZWQgaW4uJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldENhbGVuZGFyTW9udGhWaWV3RGF0YShzdGF0ZSwgbmFtZSkge1xyXG4gICAgICAgIGlmIChwaWNreS5pc1ZhbGlkUGlja3koc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbGVuZGFyID0gc3RhdGUuY2FsZW5kYXJzW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoY2FsZW5kYXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2aWV3RGF0YUhlbHBlcnMuZ2VuZXJhdGVNb250aFZpZXdEYXRhKGNhbGVuZGFyLnZpZXcubW9udGgsIGNhbGVuZGFyLnZpZXcueWVhcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZXJlIGlzIG5vIGNhbGVuZGFyIHdpdGggdGhlIG5hbWU6ICR7bmFtZX0gaW4gdGhpcyBwaWNreSBvYmplY3QuYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldENhbGVuZGFyWWVhclZpZXdEYXRhKHN0YXRlLCBuYW1lKSB7XHJcbiAgICAgICAgaWYgKHBpY2t5LmlzVmFsaWRQaWNreShzdGF0ZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgY2FsZW5kYXIgPSBzdGF0ZS5jYWxlbmRhcnNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChjYWxlbmRhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZpZXdEYXRhSGVscGVycy5nZW5lcmF0ZVllYXJWaWV3RGF0YShjYWxlbmRhci52aWV3LnllYXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGVyZSBpcyBubyBjYWxlbmRhciB3aXRoIHRoZSBuYW1lOiAke25hbWV9IGluIHRoaXMgcGlja3kgb2JqZWN0LmApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBtb3ZlQ2FsZW5kYXJWaWV3Rm9yd2FyZE9uZU1vbnRoKHN0YXRlLCBuYW1lKSB7XHJcbiAgICAgICAgaWYgKHBpY2t5LmlzVmFsaWRQaWNreShzdGF0ZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgY2FsZW5kYXIgPSBzdGF0ZS5jYWxlbmRhcnNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChjYWxlbmRhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpY2t5LnNldENhbGVuZGFyVmlldyhzdGF0ZSwgbmFtZSwgdXRpbC5nZXREYXRlT2ZGb2xsb3dpbmdNb250aChjYWxlbmRhci52aWV3KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZXJlIGlzIG5vIGNhbGVuZGFyIHdpdGggdGhlIG5hbWU6ICR7bmFtZX0gaW4gdGhpcyBwaWNreSBvYmplY3QuYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG1vdmVDYWxlbmRhclZpZXdCYWNrd2FyZE9uZU1vbnRoKHN0YXRlLCBuYW1lKSB7XHJcbiAgICAgICAgaWYgKHBpY2t5LmlzVmFsaWRQaWNreShzdGF0ZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgY2FsZW5kYXIgPSBzdGF0ZS5jYWxlbmRhcnNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChjYWxlbmRhcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpY2t5LnNldENhbGVuZGFyVmlldyhzdGF0ZSwgbmFtZSwgdXRpbC5nZXREYXRlT2ZQcmVjZWRpbmdNb250aChjYWxlbmRhci52aWV3KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZXJlIGlzIG5vIGNhbGVuZGFyIHdpdGggdGhlIG5hbWU6ICR7bmFtZX0gaW4gdGhpcyBwaWNreSBvYmplY3QuYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNyZWF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjYWxlbmRhcnM6IHt9LFxyXG4gICAgICAgICAgICBjb25zdHJhaW50czogW10sXHJcbiAgICAgICAgICAgIHZpZXdNb2RlOiAnbW9udGgnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5jb25zdCBkYXRlUGlja2VyRGF0YSA9IHBpY2t5LmNyZWF0ZSgpO1xyXG5cclxuY29uc3QgbW9kaWZpZWREYXRlUGlja2VyRGF0YSA9IHBpY2t5LmFkZENhbGVuZGFyKGRhdGVQaWNrZXJEYXRhLCAnbGVmdCcsIDIwLCAxMSwgMjAxNik7XHJcbmNvbnN0IG1vZGlmaWVkRGF0ZVBpY2tlckRhdGEyID0gcGlja3kuYWRkQ2FsZW5kYXIobW9kaWZpZWREYXRlUGlja2VyRGF0YSwgJ3JpZ2h0JywgMjAsIDksIDIwMTYpO1xyXG5cclxuY29uc29sZS5sb2cocGlja3kuc2V0Q2FsZW5kYXJWaWV3WWVhcihtb2RpZmllZERhdGVQaWNrZXJEYXRhMiwgJ2xlZnQnLCAyMDE4KSk7XHJcblxyXG5jb25zdCBhZGRlZENvbnN0cmFpbnRQaWNrZXIxID0gcGlja3kuY29uc3RyYWluVmlld1RvVmlldyhtb2RpZmllZERhdGVQaWNrZXJEYXRhMiwgJ2xlZnQnLCAncmlnaHQnLCAnPj0nKTtcclxuY29uc29sZS5sb2coYWRkZWRDb25zdHJhaW50UGlja2VyMSlcclxuY29uc3QgYWRkZWRDb25zdHJhaW50UGlja2VyMiA9IHBpY2t5LmNvbnN0cmFpblZpZXdUb1NlbGVjdGlvbihhZGRlZENvbnN0cmFpbnRQaWNrZXIxLCAnbGVmdCcsICdyaWdodCcsICc9PScsICdsaW1pdCcpO1xyXG5jb25zb2xlLmxvZyhhZGRlZENvbnN0cmFpbnRQaWNrZXIyKVxyXG5jb25zdCBhZGRlZENvbnN0cmFpbnRQaWNrZXIzID0gcGlja3kuY29uc3RyYWluU2VsZWN0aW9uVG9TZWxlY3Rpb24oYWRkZWRDb25zdHJhaW50UGlja2VyMiwgJ2xlZnQnLCAncmlnaHQnLCAnPT0nLCAnY2FuY2VsJyk7XHJcbmNvbnNvbGUubG9nKGFkZGVkQ29uc3RyYWludFBpY2tlcjMpXHJcbmNvbnN0IGFkZGVkQ29uc3RyYWludFBpY2tlcjQgPSBwaWNreS5jb25zdHJhaW5TZWxlY3Rpb25Ub1ZpZXcoYWRkZWRDb25zdHJhaW50UGlja2VyMywgJ2xlZnQnLCAncmlnaHQnLCAnPT0nKTtcclxuY29uc29sZS5sb2coYWRkZWRDb25zdHJhaW50UGlja2VyNClcclxuY29uc3QgYWRkZWRDb25zdHJhaW50UGlja2VyNSA9IHBpY2t5LmNvbnN0cmFpblZpZXdUb0RhdGUoYWRkZWRDb25zdHJhaW50UGlja2VyNCwgJ3JpZ2h0Jywge2RheTogNSwgbW9udGg6IDgsIHllYXI6IDIwMjB9LCAnPD0nLCAnY2FuY2VsJyk7XHJcbmNvbnNvbGUubG9nKGFkZGVkQ29uc3RyYWludFBpY2tlcjUpXHJcbmNvbnN0IGFkZGVkQ29uc3RyYWludFBpY2tlcjYgPSBwaWNreS5jb25zdHJhaW5TZWxlY3Rpb25Ub0RhdGUoYWRkZWRDb25zdHJhaW50UGlja2VyNSwgJ2xlZnQnLCB7ZGF5OiA1LCBtb250aDogOCwgeWVhcjogMjAxMH0sICc+PScsICdsaW1pdCcsIHRydWUpO1xyXG5jb25zb2xlLmxvZyhhZGRlZENvbnN0cmFpbnRQaWNrZXI2KVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmNsYXNzIHV0aWwge1xyXG4gICAgc3RhdGljIGlzTGVhcFllYXIoeWVhcikge1xyXG4gICAgICAgIGlmICh5ZWFyJTQgIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoeWVhciUxMDAgIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyJTQwMCAhPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhQmVmb3JlQihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEueWVhciA8IGIueWVhclxyXG4gICAgICAgICAgICB8fCBhLnllYXIgPT09IGIueWVhciAmJiBhLm1vbnRoIDwgYi5tb250aFxyXG4gICAgICAgICAgICB8fCBhLnllYXIgPT09IGIueWVhciAmJiBhLm1vbnRoID09PSBiLm1vbnRoICYmIGEuZGF5IDwgYi5kYXk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFBZnRlckIoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhLnllYXIgPiBiLnllYXJcclxuICAgICAgICAgICAgfHwgYS55ZWFyID09PSBiLnllYXIgJiYgYS5tb250aCA+IGIubW9udGhcclxuICAgICAgICAgICAgfHwgYS55ZWFyID09PSBiLnllYXIgJiYgYS5tb250aCA9PT0gYi5tb250aCAmJiBhLmRheSA+IGIuZGF5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgZ2V0V2Vla2RheShkYXksIG1vbnRoLCB5ZWFyKSB7XHJcbiAgICAgICAgLy8gSW1wbGVtZW50aW5nIFplbGxlcidzIGNvbmdydWVuY2VcclxuICAgICAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9aZWxsZXIlMjdzX2NvbmdydWVuY2VcclxuXHJcbiAgICAgICAgY29uc3QgcSA9IGRheTtcclxuICAgICAgICBsZXQgbTtcclxuICAgICAgICBsZXQgcG90ZW50aWFsbHlTaGlmdGVkWWVhcjtcclxuICAgICAgICBpZiAobW9udGggPD0gMikge1xyXG4gICAgICAgICAgICBtID0gbW9udGgrMTI7XHJcbiAgICAgICAgICAgIHBvdGVudGlhbGx5U2hpZnRlZFllYXIgPSB5ZWFyLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbSA9IG1vbnRoO1xyXG4gICAgICAgICAgICBwb3RlbnRpYWxseVNoaWZ0ZWRZZWFyID0geWVhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgSyA9IHBvdGVudGlhbGx5U2hpZnRlZFllYXIgJSAxMDA7XHJcbiAgICAgICAgY29uc3QgSiA9IE1hdGguZmxvb3IocG90ZW50aWFsbHlTaGlmdGVkWWVhciAvIDEwMCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGggPSAocSArIE1hdGguZmxvb3IoMTMqKG0gKyAxKSAvIDUpICsgSyArIE1hdGguZmxvb3IoSy80KSArIE1hdGguZmxvb3IoSi80KSArIDUqSikgJSA3O1xyXG5cclxuICAgICAgICBjb25zdCBkID0gKChoKzUpICUgNyk7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldEZvbGxvd2luZ01vbnRoTnVtYmVyKG1vbnRoKSB7XHJcbiAgICAgICAgaWYgKG1vbnRoID09PSAxMikge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9udGggKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0UHJlY2VkaW5nTW9udGhOdW1iZXIobW9udGgpIHtcclxuICAgICAgICBpZiAobW9udGggPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDEyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb250aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXREYXRlT2ZGb2xsb3dpbmdNb250aChkYXRlKSB7XHJcbiAgICAgICAgY29uc3QgZm9sbG93aW5nTW9udGggPSB1dGlsLmdldEZvbGxvd2luZ01vbnRoTnVtYmVyKGRhdGUubW9udGgpO1xyXG4gICAgICAgIGNvbnN0IHllYXJPZkZvbGxvd2luZ01vbnRoID0gZm9sbG93aW5nTW9udGggPT09IDEgPyBkYXRlLnllYXIrMSA6IGRhdGUueWVhcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF5OiBNYXRoLm1pbihkYXRlLmRheSwgdXRpbC5nZXREYXlzSW5Nb250aChmb2xsb3dpbmdNb250aCwgeWVhck9mRm9sbG93aW5nTW9udGgpKSxcclxuICAgICAgICAgICAgbW9udGg6IGZvbGxvd2luZ01vbnRoLFxyXG4gICAgICAgICAgICB5ZWFyOiB5ZWFyT2ZGb2xsb3dpbmdNb250aFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldERhdGVPZlByZWNlZGluZ01vbnRoKGRhdGUpIHtcclxuICAgICAgICBjb25zdCBwcmVjZWRpbmdNb250aCA9IHV0aWwuZ2V0UHJlY2VkaW5nTW9udGhOdW1iZXIoZGF0ZS5tb250aCk7XHJcbiAgICAgICAgY29uc3QgeWVhck9mUHJlY2VkaW5nTW9udGggPSBwcmVjZWRpbmdNb250aCA9PT0gMTIgPyBkYXRlLnllYXItMSA6IGRhdGUueWVhcjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF5OiBNYXRoLm1pbihkYXRlLmRheSwgdXRpbC5nZXREYXlzSW5Nb250aChwcmVjZWRpbmdNb250aCwgeWVhck9mUHJlY2VkaW5nTW9udGgpKSxcclxuICAgICAgICAgICAgbW9udGg6IHByZWNlZGluZ01vbnRoLFxyXG4gICAgICAgICAgICB5ZWFyOiB5ZWFyT2ZQcmVjZWRpbmdNb250aFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldERheXNJbk1vbnRoKG1vbnRoLCB5ZWFyKSB7XHJcbiAgICAgICAgY29uc3QgbW9udGhMZW5ndGhzID0gW1xyXG4gICAgICAgICAgICAzMSwgdXRpbC5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFcclxuICAgICAgICBdO1xyXG4gICAgICAgIHJldHVybiBtb250aExlbmd0aHNbbW9udGgtMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHV0aWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwnO1xyXG5cclxuY2xhc3Mgdmlld0RhdGFIZWxwZXJzIHtcclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlRGF5T2JqZWN0KGRheSwgd2Vla2RheSwgbW9udGgsIHllYXIpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXksIHdlZWtkYXksIG1vbnRoLCB5ZWFyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2VuZXJhdGVZZWFyVmlld0RhdGEoeWVhcikge1xyXG4gICAgICAgIGNvbnN0IGlzTGVhcFllYXIgPSB1dGlsLmlzTGVhcFllYXIoeWVhcik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeWVhcjogeWVhcixcclxuICAgICAgICAgICAgaXNMZWFwWWVhcjogaXNMZWFwWWVhcixcclxuICAgICAgICAgICAgbnVtYmVyT2ZEYXlzOiBpc0xlYXBZZWFyID8gMzY2OiAzNjUsXHJcbiAgICAgICAgICAgIG1vbnRoczogKG5ldyBBcnJheSgxMikpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbGwoMClcclxuICAgICAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSwgaW5kZXgpID0+IGluZGV4KzEpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgobW9udGhOdW1iZXIpICA9PiB2aWV3RGF0YUhlbHBlcnMuZ2VuZXJhdGVNb250aFZpZXdEYXRhKG1vbnRoTnVtYmVyLCB5ZWFyKSlcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2VuZXJhdGVNb250aFZpZXdEYXRhKG1vbnRoLCB5ZWFyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRXZWVrZGF5ID0gdXRpbC5nZXRXZWVrZGF5KDEsIG1vbnRoLCB5ZWFyKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJlY2VkaW5nTW9udGggPSB1dGlsLmdldFByZWNlZGluZ01vbnRoTnVtYmVyKG1vbnRoKTtcclxuICAgICAgICBjb25zdCB5ZWFyT2ZQcmVjZWRpbmdNb250aCA9IHByZWNlZGluZ01vbnRoID09PSAxMiA/IHllYXItMSA6IHllYXI7XHJcbiAgICAgICAgY29uc3QgZGF5c0luUHJlY2VkaW5nTW9udGggPSB1dGlsLmdldERheXNJbk1vbnRoKHByZWNlZGluZ01vbnRoLCB5ZWFyKTtcclxuXHJcbiAgICAgICAgY29uc3QgZm9sbG93aW5nTW9udGggPSB1dGlsLmdldEZvbGxvd2luZ01vbnRoTnVtYmVyKG1vbnRoKTtcclxuICAgICAgICBjb25zdCB5ZWFyT2ZGb2xsb3dpbmdNb250aCA9IGZvbGxvd2luZ01vbnRoID09PSAxID8geWVhcisxIDogeWVhcjtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGRheXNJbkN1cnJlbnRNb250aCA9IHV0aWwuZ2V0RGF5c0luTW9udGgobW9udGgsIHllYXIpO1xyXG5cclxuICAgICAgICBjb25zdCB3ZWVrcyA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgY3VycmVudERhdGUgPSAxO1xyXG4gICAgICAgIGxldCBjdXJyZW50V2Vla0luZGV4ID0gMDtcclxuICAgICAgICBsZXQgY3VycmVudERheUluRm9sbG93aW5nTW9udGggPSAxO1xyXG5cclxuICAgICAgICB3ZWVrc1tjdXJyZW50V2Vla0luZGV4XSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0V2Vla2RheTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHdlZWtzW2N1cnJlbnRXZWVrSW5kZXhdLnB1c2godmlld0RhdGFIZWxwZXJzLmNyZWF0ZURheU9iamVjdChcclxuICAgICAgICAgICAgICAgIGRheXNJblByZWNlZGluZ01vbnRoIC0gc3RhcnRXZWVrZGF5ICsgMSArIGksXHJcbiAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAgICAgcHJlY2VkaW5nTW9udGgsXHJcbiAgICAgICAgICAgICAgICB5ZWFyT2ZQcmVjZWRpbmdNb250aFxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUod2Vla3NbY3VycmVudFdlZWtJbmRleF0ubGVuZ3RoIDwgNyB8fCBjdXJyZW50RGF0ZSA8PSBkYXlzSW5DdXJyZW50TW9udGgpIHtcclxuICAgICAgICAgICAgaWYod2Vla3NbY3VycmVudFdlZWtJbmRleF0ubGVuZ3RoID09PSA3KSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50V2Vla0luZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB3ZWVrc1tjdXJyZW50V2Vla0luZGV4XSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnREYXRlIDw9IGRheXNJbkN1cnJlbnRNb250aCkge1xyXG4gICAgICAgICAgICAgICAgd2Vla3NbY3VycmVudFdlZWtJbmRleF0ucHVzaCh2aWV3RGF0YUhlbHBlcnMuY3JlYXRlRGF5T2JqZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlZWtzW2N1cnJlbnRXZWVrSW5kZXhdLmxlbmd0aCsxLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoLFxyXG4gICAgICAgICAgICAgICAgICAgIHllYXJcclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlZWtzW2N1cnJlbnRXZWVrSW5kZXhdLnB1c2godmlld0RhdGFIZWxwZXJzLmNyZWF0ZURheU9iamVjdChcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RGF5SW5Gb2xsb3dpbmdNb250aCxcclxuICAgICAgICAgICAgICAgICAgICB3ZWVrc1tjdXJyZW50V2Vla0luZGV4XS5sZW5ndGgrMSxcclxuICAgICAgICAgICAgICAgICAgICBmb2xsb3dpbmdNb250aCxcclxuICAgICAgICAgICAgICAgICAgICB5ZWFyT2ZGb2xsb3dpbmdNb250aFxyXG4gICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF5SW5Gb2xsb3dpbmdNb250aCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vbnRoOiBtb250aCxcclxuICAgICAgICAgICAgeWVhcjogeWVhcixcclxuICAgICAgICAgICAgd2Vla3M6IHdlZWtzLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdmlld0RhdGFIZWxwZXJzOyJdfQ==
