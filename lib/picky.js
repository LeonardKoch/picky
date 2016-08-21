'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _viewDataHelpers = require('./viewDataHelpers.js');

var _viewDataHelpers2 = _interopRequireDefault(_viewDataHelpers);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
                        selection: {
                            year: startYear || currentDate.getFullYear(),
                            month: startMonth || currentDate.getMonth() + 1,
                            day: startDay || currentDate.getDate()
                        }
                    }))
                });
            } else {
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
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
                return state;
            }
        }
    }, {
        key: 'getCalendarViewData',
        value: function getCalendarViewData(state, name) {
            if (picky.isValidPicky(state)) {
                var calendar = state.calendars[name];
                if (calendar) {
                    return _viewDataHelpers2.default.generateMonthViewData(calendar.view.month, calendar.view.year, null);
                } else {
                    console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
                    return null;
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

module.exports = picky;