'use strict';

import {
    generateMonthViewData,
    generateYearViewData,
} from './viewDataHelpers';

import {
    aBeforeB,
    aAfterB,
    getDateOfFollowingMonth,
    getDateOfPrecedingMonth,
} from './util';

export function addCalendar(state, name, startDay, startMonth, startYear) {
    if (isValidPicky(state)) {
        const currentDate = new Date();

        return {
            ...state,
            calendars: {
                ...state.calendars,
                ...{
                    [name]: {
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
                    }
                }
            }
        };
    } else {
        return state;
    }
}

export function constrainViewToView(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
    return addCalendarConstraint(state, agentCalendarName, 'view', gateCalendarName, 'view', comparator, behaviour);
}
export function constrainViewToSelection(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
    return addCalendarConstraint(state, agentCalendarName, 'view', gateCalendarName, 'selection', comparator, behaviour);
}
export function constrainSelectionToView(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
    return addCalendarConstraint(state, agentCalendarName, 'selection', gateCalendarName, 'view', comparator, behaviour);
}
export function constrainSelectionToSelection(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
    return addCalendarConstraint(state, agentCalendarName, 'selection', gateCalendarName, 'selection', comparator, behaviour);
}

export function constrainViewToDate(state, agentCalendarName, date, comparator, behaviour, keepLive) {
    return addCalendarConstraint(state, agentCalendarName, 'selection', keepLive ? date : Object.assign({}, date), comparator, behaviour);
}
export function constrainSelectionToDate(state, agentCalendarName, date, comparator, behaviour, keepLive) {
    return addCalendarConstraint(state, agentCalendarName, 'selection', keepLive ? date : Object.assign({}, date), comparator, behaviour);
}

export function addCalendarConstraint(state, agentCalendarName, agentProperty, gateCalendarName, gateProperty, comparator = '<=', behaviour = 'limit') {
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

export function addDateConstraint(state, agentCalendarName, agentProperty, date, comparator = '<=', behaviour = 'limit') {
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

export function addConstraint(state, constraint) {
    if (isValidPicky(state)) {
        return {
            ...state,
            constraints: [
                ...state.constraints,
                constraint
            ]
        };
    } else {
        return state;
    }
}

export function setCalendar(state, name, calendar) {
    if (isValidPicky(state)) {
        return {
            ...state,
            calendars: {
                ...state.calendars,
                ...{ [name]: calendar }
            }
        };
    } else {
        return state;
    }
}

export function getGateValue(state, constraint) {
    const gate = constraint.gate;
    switch (gate.type) {
        case 'calendar':
            return state.calendars[gate.calendar][gate.property];
            break;
        case 'date':
            return gate.date;
            break;
    }
}

export function checkConstraintViolation(state, constraint, calendar, property, value) {
    if (constraint.agent.calendar === calendar && constraint.agent.property === property) {
        // Is applicable constraint
        const constraintValue = getGateValue(state, constraint);

        const valueBeforeGate = aBeforeB(value, constraintValue);
        const valueAfterGate = aAfterB(value, constraintValue);
        const valueEqualGate = !valueBeforeGate && !valueAfterGate;

        let valueIsValid;
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
                    return Object.assign({}, constraintValue)
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

export function validateChangeAgainstConstraints(state, calendarName, property, value) {
    return state.constraints.reduce((currentView, constraint) => {
        return checkConstraintViolation(state, constraint, calendarName, property, currentView);
    }, value);
}

export function setCalendarView(state, calendarName, view) {
    if (isValidPicky(state)) {
        const constrainedView = validateChangeAgainstConstraints(state, calendarName, 'view', view);

        return setCalendar(state, calendarName, {
            ...state.calendars[calendarName],
            view: constrainedView
        });
    } else {
        return state;
    }
}
export function setCalendarViewDay(state, name, day) {
    if (isValidPicky(state)) {
        return setCalendarView(state, name, {
            ...state.calendars[name].view,
            day: day
        });
    } else {
        return state;
    }
}
export function setCalendarViewMonth(state, name, month) {
    if (isValidPicky(state)) {
        return setCalendarView(state, name, {
            ...state.calendars[name].view,
            month: month
        });
    } else {
        return state;
    }
}
export function setCalendarViewYear(state, name, year) {
    if (isValidPicky(state)) {
        return setCalendarView(state, name, {
            ...state.calendars[name].view,
            year: year
        });
    } else {
        return state;
    }
}

export function setCalendarSelection(state, name, selection) {
    if (isValidPicky(state)) {
        return setCalendar(state, name, {
            ...state.calendars[name],
            selection: selection
        });
    } else {
        return state;
    }
}
export function setCalendarSelectionDay(state, name, day) {
    if (isValidPicky(state)) {
        return setCalendarSelection(state, name, {
            ...state.calendars[name].selection,
            day: day
        });
    } else {
        return state;
    }
}
export function setCalendarSelectionMonth(state, name, month) {
    if (isValidPicky(state)) {
        return setCalendarSelection(state, name, {
            ...state.calendars[name].selection,
            month: month
        });
    } else {
        return state;
    }
}
export function setCalendarSelectionYear(state, name, year) {
    if (isValidPicky(state)) {
        return setCalendarSelection(state, name, {
            ...state.calendars[name].selection,
            year: year
        });
    } else {
        return state;
    }
}


export function isValidPicky(state) {
    if (typeof state === typeof {} && typeof state.calendars === typeof []) {
        return true;
    } else {
        console.warn('No valid picky data passed in.');
        return false;
    }
}

export function getCalendarMonthViewData(state, name) {
    if (isValidPicky(state)) {
        const calendar = state.calendars[name];
        if (calendar) {
            return generateMonthViewData(calendar.view.month, calendar.view.year);
        } else {
            console.warn(`There is no calendar with the name: ${name} in this picky object.`);
            return state;
        }
    } else {
        return state;
    }
}

export function getCalendarYearViewData(state, name) {
    if (isValidPicky(state)) {
        const calendar = state.calendars[name];
        if (calendar) {
            return generateYearViewData(calendar.view.year);
        } else {
            console.warn(`There is no calendar with the name: ${name} in this picky object.`);
            return state;
        }
    } else {
        return state;
    }
}

export function moveCalendarViewForwardOneMonth(state, name) {
    if (isValidPicky(state)) {
        const calendar = state.calendars[name];
        if (calendar) {
            return setCalendarView(state, name, getDateOfFollowingMonth(calendar.view));
        } else {
            console.warn(`There is no calendar with the name: ${name} in this picky object.`);
            return state;
        }
    } else {
        return state;
    }
}

export function moveCalendarViewBackwardOneMonth(state, name) {
    if (isValidPicky(state)) {
        const calendar = state.calendars[name];
        if (calendar) {
            return setCalendarView(state, name, getDateOfPrecedingMonth(calendar.view));
        } else {
            console.warn(`There is no calendar with the name: ${name} in this picky object.`);
            return state;
        }
    } else {
        return state;
    }
}

export function getCalendarViewData(state, name) {
    if (isValidPicky(state)) {
        const calendar = state.calendars[name];
        if (calendar) {
            return generateMonthViewData(calendar.view.month, calendar.view.year, null, [calendar.selection]);
        } else {
            console.warn(`There is no calendar with the name: ${name} in this picky object.`);
            return null;
        }
    } else {
        return null;
    }
}


export function create() {
    return {
        calendars: {},
        constraints: [],
        viewMode: 'month'
    };
}
