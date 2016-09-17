'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isLeapYear(year) {
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

function aEqualToB(a, b) {
    return a.year === b.year && a.month === b.month && a.day === b.day;
}

function aBeforeB(a, b) {
    return a.year < b.year || a.year === b.year && a.month < b.month || a.year === b.year && a.month === b.month && a.day < b.day;
}

function aAfterB(a, b) {
    return a.year > b.year || a.year === b.year && a.month > b.month || a.year === b.year && a.month === b.month && a.day > b.day;
}

function getWeekday(day, month, year) {
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

function getFollowingMonthNumber(month) {
    if (month === 12) {
        return 1;
    } else {
        return month + 1;
    }
}

function getPrecedingMonthNumber(month) {
    if (month === 1) {
        return 12;
    } else {
        return month - 1;
    }
}

function getDateOfFollowingMonth(date) {
    var followingMonth = getFollowingMonthNumber(date.month);
    var yearOfFollowingMonth = followingMonth === 1 ? date.year + 1 : date.year;

    return {
        day: Math.min(date.day, getDaysInMonth(followingMonth, yearOfFollowingMonth)),
        month: followingMonth,
        year: yearOfFollowingMonth
    };
}

function getDateOfPrecedingMonth(date) {
    var precedingMonth = getPrecedingMonthNumber(date.month);
    var yearOfPrecedingMonth = precedingMonth === 12 ? date.year - 1 : date.year;

    return {
        day: Math.min(date.day, getDaysInMonth(precedingMonth, yearOfPrecedingMonth)),
        month: precedingMonth,
        year: yearOfPrecedingMonth
    };
}

function getDaysInMonth(month, year) {
    var monthLengths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return monthLengths[month - 1];
}

function createDayObject(day, weekday, month, year, constraints, selections) {

    var dayObj = {
        day: day, weekday: weekday, month: month, year: year
    };

    dayObj.isSelected = isDateInDateList(dayObj, selections);

    //getDateComparatives()

    return dayObj;
}

function generateYearViewData(year) {
    var isLeapYear = isLeapYear(year);
    return {
        year: year,
        isLeapYear: isLeapYear,
        numberOfDays: isLeapYear ? 366 : 365,
        months: new Array(12).fill(0).map(function (value, index) {
            return index + 1;
        }).map(function (monthNumber) {
            return generateMonthViewData(monthNumber, year);
        })
    };
}

function isDateInDateList(date, dateList) {
    return dateList.some(function (currentDate) {
        return aEqualToB(date, currentDate);
    });
}

function generateMonthViewData(month, year, constraints, selections) {
    var startWeekday = getWeekday(1, month, year);

    var precedingMonth = getPrecedingMonthNumber(month);
    var yearOfPrecedingMonth = precedingMonth === 12 ? year - 1 : year;
    var daysInPrecedingMonth = getDaysInMonth(precedingMonth, year);

    var followingMonth = getFollowingMonthNumber(month);
    var yearOfFollowingMonth = followingMonth === 1 ? year + 1 : year;

    var daysInCurrentMonth = getDaysInMonth(month, year);

    var weeks = [];

    var currentDate = 1;
    var currentWeekIndex = 0;
    var currentDayInFollowingMonth = 1;

    weeks[currentWeekIndex] = [];

    for (var i = 0; i < startWeekday; i++) {
        weeks[currentWeekIndex].push(createDayObject(daysInPrecedingMonth - startWeekday + 1 + i, i, precedingMonth, yearOfPrecedingMonth, constraints, selections));
    }
    while (weeks[currentWeekIndex].length < 7 || currentDate <= daysInCurrentMonth) {
        if (weeks[currentWeekIndex].length === 7) {
            currentWeekIndex++;
            weeks[currentWeekIndex] = [];
        }
        if (currentDate <= daysInCurrentMonth) {
            weeks[currentWeekIndex].push(createDayObject(currentDate, weeks[currentWeekIndex].length + 1, month, year, constraints, selections));
            currentDate++;
        } else {
            weeks[currentWeekIndex].push(createDayObject(currentDayInFollowingMonth, weeks[currentWeekIndex].length + 1, followingMonth, yearOfFollowingMonth, constraints, selections));
            currentDayInFollowingMonth++;
        }
    }
    return {
        month: month,
        year: year,
        weeks: weeks
    };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function addCalendar(state, name, startDay, startMonth, startYear) {
    if (isValidPicky(state)) {
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

function constrainViewToView(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
    return addCalendarConstraint(state, agentCalendarName, 'view', gateCalendarName, 'view', comparator, behaviour);
}
function constrainViewToSelection(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
    return addCalendarConstraint(state, agentCalendarName, 'view', gateCalendarName, 'selection', comparator, behaviour);
}
function constrainSelectionToView(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
    return addCalendarConstraint(state, agentCalendarName, 'selection', gateCalendarName, 'view', comparator, behaviour);
}
function constrainSelectionToSelection(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
    return addCalendarConstraint(state, agentCalendarName, 'selection', gateCalendarName, 'selection', comparator, behaviour);
}

function constrainViewToDate(state, agentCalendarName, date, comparator, behaviour, keepLive) {
    return addCalendarConstraint(state, agentCalendarName, 'selection', keepLive ? date : Object.assign({}, date), comparator, behaviour);
}
function constrainSelectionToDate(state, agentCalendarName, date, comparator, behaviour, keepLive) {
    return addCalendarConstraint(state, agentCalendarName, 'selection', keepLive ? date : Object.assign({}, date), comparator, behaviour);
}

function addCalendarConstraint(state, agentCalendarName, agentProperty, gateCalendarName, gateProperty) {
    var comparator = arguments.length <= 5 || arguments[5] === undefined ? '<=' : arguments[5];
    var behaviour = arguments.length <= 6 || arguments[6] === undefined ? 'limit' : arguments[6];

    return addConstraint(state, {
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

function addDateConstraint(state, agentCalendarName, agentProperty, date) {
    var comparator = arguments.length <= 4 || arguments[4] === undefined ? '<=' : arguments[4];
    var behaviour = arguments.length <= 5 || arguments[5] === undefined ? 'limit' : arguments[5];

    return addConstraint(state, {
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

function addConstraint(state, constraint) {
    if (isValidPicky(state)) {
        return _extends({}, state, {
            constraints: [].concat(_toConsumableArray(state.constraints), [constraint])
        });
    } else {
        return state;
    }
}

function setCalendar(state, name, calendar) {
    if (isValidPicky(state)) {
        return _extends({}, state, {
            calendars: _extends({}, state.calendars, _defineProperty({}, name, calendar))
        });
    } else {
        return state;
    }
}

function getGateValue(state, constraint) {
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

function checkConstraintViolation(state, constraint, calendar, property, value) {
    if (constraint.agent.calendar === calendar && constraint.agent.property === property) {
        // Is applicable constraint
        var constraintValue = getGateValue(state, constraint);

        var valueBeforeGate = aBeforeB(value, constraintValue);
        var valueAfterGate = aAfterB(value, constraintValue);
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

function validateChangeAgainstConstraints(state, calendarName, property, value) {
    return state.constraints.reduce(function (currentView, constraint) {
        return checkConstraintViolation(state, constraint, calendarName, property, currentView);
    }, value);
}

function setCalendarView(state, calendarName, view) {
    if (isValidPicky(state)) {
        var constrainedView = validateChangeAgainstConstraints(state, calendarName, 'view', view);

        return setCalendar(state, calendarName, _extends({}, state.calendars[calendarName], {
            view: constrainedView
        }));
    } else {
        return state;
    }
}
function setCalendarViewDay(state, name, day) {
    if (isValidPicky(state)) {
        return setCalendarView(state, name, _extends({}, state.calendars[name].view, {
            day: day
        }));
    } else {
        return state;
    }
}
function setCalendarViewMonth(state, name, month) {
    if (isValidPicky(state)) {
        return setCalendarView(state, name, _extends({}, state.calendars[name].view, {
            month: month
        }));
    } else {
        return state;
    }
}
function setCalendarViewYear(state, name, year) {
    if (isValidPicky(state)) {
        return setCalendarView(state, name, _extends({}, state.calendars[name].view, {
            year: year
        }));
    } else {
        return state;
    }
}

function setCalendarSelection(state, name, selection) {
    if (isValidPicky(state)) {
        return setCalendar(state, name, _extends({}, state.calendars[name], {
            selection: selection
        }));
    } else {
        return state;
    }
}
function setCalendarSelectionDay(state, name, day) {
    if (isValidPicky(state)) {
        return setCalendarSelection(state, name, _extends({}, state.calendars[name].selection, {
            day: day
        }));
    } else {
        return state;
    }
}
function setCalendarSelectionMonth(state, name, month) {
    if (isValidPicky(state)) {
        return setCalendarSelection(state, name, _extends({}, state.calendars[name].selection, {
            month: month
        }));
    } else {
        return state;
    }
}
function setCalendarSelectionYear(state, name, year) {
    if (isValidPicky(state)) {
        return setCalendarSelection(state, name, _extends({}, state.calendars[name].selection, {
            year: year
        }));
    } else {
        return state;
    }
}

function isValidPicky(state) {
    if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) === _typeof({}) && _typeof(state.calendars) === _typeof([])) {
        return true;
    } else {
        console.warn('No valid picky data passed in.');
        return false;
    }
}

function getCalendarMonthViewData(state, name) {
    if (isValidPicky(state)) {
        var calendar = state.calendars[name];
        if (calendar) {
            return generateMonthViewData(calendar.view.month, calendar.view.year);
        } else {
            console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
            return state;
        }
    } else {
        return state;
    }
}

function getCalendarYearViewData(state, name) {
    if (isValidPicky(state)) {
        var calendar = state.calendars[name];
        if (calendar) {
            return generateYearViewData(calendar.view.year);
        } else {
            console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
            return state;
        }
    } else {
        return state;
    }
}

function moveCalendarViewForwardOneMonth(state, name) {
    if (isValidPicky(state)) {
        var calendar = state.calendars[name];
        if (calendar) {
            return setCalendarView(state, name, getDateOfFollowingMonth(calendar.view));
        } else {
            console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
            return state;
        }
    } else {
        return state;
    }
}

function moveCalendarViewBackwardOneMonth(state, name) {
    if (isValidPicky(state)) {
        var calendar = state.calendars[name];
        if (calendar) {
            return setCalendarView(state, name, getDateOfPrecedingMonth(calendar.view));
        } else {
            console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
            return state;
        }
    } else {
        return state;
    }
}

function getCalendarViewData(state, name) {
    if (isValidPicky(state)) {
        var calendar = state.calendars[name];
        if (calendar) {
            return generateMonthViewData(calendar.view.month, calendar.view.year, null, [calendar.selection]);
        } else {
            console.warn('There is no calendar with the name: ' + name + ' in this picky object.');
            return null;
        }
    } else {
        return null;
    }
}

function create() {
    return {
        calendars: {},
        constraints: [],
        viewMode: 'month'
    };
}

exports.addCalendar = addCalendar;
exports.constrainViewToView = constrainViewToView;
exports.constrainViewToSelection = constrainViewToSelection;
exports.constrainSelectionToView = constrainSelectionToView;
exports.constrainSelectionToSelection = constrainSelectionToSelection;
exports.constrainViewToDate = constrainViewToDate;
exports.constrainSelectionToDate = constrainSelectionToDate;
exports.addCalendarConstraint = addCalendarConstraint;
exports.addDateConstraint = addDateConstraint;
exports.addConstraint = addConstraint;
exports.setCalendar = setCalendar;
exports.getGateValue = getGateValue;
exports.checkConstraintViolation = checkConstraintViolation;
exports.validateChangeAgainstConstraints = validateChangeAgainstConstraints;
exports.setCalendarView = setCalendarView;
exports.setCalendarViewDay = setCalendarViewDay;
exports.setCalendarViewMonth = setCalendarViewMonth;
exports.setCalendarViewYear = setCalendarViewYear;
exports.setCalendarSelection = setCalendarSelection;
exports.setCalendarSelectionDay = setCalendarSelectionDay;
exports.setCalendarSelectionMonth = setCalendarSelectionMonth;
exports.setCalendarSelectionYear = setCalendarSelectionYear;
exports.isValidPicky = isValidPicky;
exports.getCalendarMonthViewData = getCalendarMonthViewData;
exports.getCalendarYearViewData = getCalendarYearViewData;
exports.moveCalendarViewForwardOneMonth = moveCalendarViewForwardOneMonth;
exports.moveCalendarViewBackwardOneMonth = moveCalendarViewBackwardOneMonth;
exports.getCalendarViewData = getCalendarViewData;
exports.create = create;