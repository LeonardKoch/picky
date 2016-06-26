'use strict';

import viewDataHelpers from './viewDataHelpers.js';
import util from './util.js';

class picky {

    static addCalendar(state, name, startDay, startMonth, startYear) {
         if (picky.isValidPicky(state)) {
            const currentDate = new Date();

            return {
                ...state,
                calendars: {
                    ...state.calendars,
                    ...{[name] : {
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
                    }}
                }
            };
        } else {
            return null;
        }
    }

    static constrainViewToView(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
        return picky.addCalendarConstraint(state, agentCalendarName, 'view', gateCalendarName, 'view', comparator, behaviour);
    }
    static constrainViewToSelection(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
        return picky.addCalendarConstraint(state, agentCalendarName, 'view', gateCalendarName, 'selection', comparator, behaviour);
    }
    static constrainSelectionToView(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
        return picky.addCalendarConstraint(state, agentCalendarName, 'selection', gateCalendarName, 'view', comparator, behaviour);
    }
    static constrainSelectionToSelection(state, agentCalendarName, gateCalendarName, comparator, behaviour) {
        return picky.addCalendarConstraint(state, agentCalendarName, 'selection', gateCalendarName, 'selection', comparator, behaviour);
    }

    static constrainViewToDate(state, agentCalendarName, date, comparator, behaviour, keepLive) {
        return picky.addCalendarConstraint(state, agentCalendarName, 'selection', keepLive ? date : Object.assign({}, date), comparator, behaviour);
    }
    static constrainSelectionToDate(state, agentCalendarName, date, comparator, behaviour, keepLive) {
        return picky.addCalendarConstraint(state, agentCalendarName, 'selection', keepLive ? date : Object.assign({}, date), comparator, behaviour);
    }

    static addCalendarConstraint(state, agentCalendarName, agentProperty, gateCalendarName, gateProperty, comparator = '<=', behaviour = 'limit') {
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

    static addDateConstraint(state, agentCalendarName, agentProperty, date, comparator = '<=', behaviour = 'limit') {
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

    static addConstraint(state, constraint) {
         if (picky.isValidPicky(state)) {
            return {
                ...state,
                constraints: [
                    ...state.constraints,
                    constraint
                ]
            };
        } else {
            return null;
        }
    }

    static setCalendar(state, name, calendar) {
        if (picky.isValidPicky(state)) {
            return {
                ...state,
                calendars: {
                    ...state.calendars,
                    ...{[name] : calendar}
                }
            };
        } else {
            return null;
        }
    }

    static getGateValue(state, constraint) {
        const gate = constraint.gate;
        switch(gate.type) {
            case 'calendar':
                return state.calendars[gate.calendar][gate.property];
                break;
            case 'date':
                return gate.date;
                break;
        }
    }

    static checkConstraintViolation(state, constraint, calendar, property, value) {
        if (constraint.agent.calendar === calendar && constraint.agent.property === property) {
            // Is applicable constraint
            const constraintValue = picky.getGateValue(state, constraint);

            const valueBeforeGate = util.aBeforeB(value, constraintValue);
            const valueAfterGate = util.aAfterB(value, constraintValue);
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

    static validateChangeAgainstConstraints(state, calendarName, property, value) {
        return state.constraints.reduce((currentView, constraint) => {
                return picky.checkConstraintViolation(state, constraint, calendarName, property, currentView);
        }, value);
    }

    static setCalendarView(state, calendarName, view) {
        if (picky.isValidPicky(state)) {
            const constrainedView = picky.validateChangeAgainstConstraints(state, calendarName, 'view', view);

            return picky.setCalendar(state, calendarName, {
                ...state.calendars[calendarName],
                view: constrainedView
            });
        } else {
            return null;
        }
    }
    static setCalendarViewDay(state, name, day) {
        if (picky.isValidPicky(state)) {
            return picky.setCalendarView(state, name, {
                ...state.calendars[name].view,
                day: day
            });
        } else {
            return null;
        }
    }
    static setCalendarViewMonth(state, name, month) {
        if (picky.isValidPicky(state)) {
            return picky.setCalendarView(state, name, {
                ...state.calendars[name].view,
                month: month
            });
        } else {
            return null;
        }
    }
    static setCalendarViewYear(state, name, year) {
        if (picky.isValidPicky(state)) {
            return picky.setCalendarView(state, name, {
                ...state.calendars[name].view,
                year: year
            });
        } else {
            return null;
        }
    }

    static setCalendarSelection(state, name, selection) {
        if (picky.isValidPicky(state)) {
            return picky.setCalendar(state, name, {
                ...state.calendars[name],
                selection: selection
            });
        } else {
            return null;
        }
    }
    static setCalendarSelectionDay(state, name, day) {
        if (picky.isValidPicky(state)) {
            return picky.setCalendarSelection(state, name, {
                ...state.calendars[name].selection,
                day: day
            });
        } else {
            return null;
        }
    }
    static setCalendarSelectionMonth(state, name, month) {
        if (picky.isValidPicky(state)) {
            return picky.setCalendarSelection(state, name, {
                ...state.calendars[name].selection,
                month: month
            });
        } else {
            return null;
        }
    }
    static setCalendarSelectionYear(state, name, year) {
        if (picky.isValidPicky(state)) {
            return picky.setCalendarSelection(state, name, {
                ...state.calendars[name].selection,
                year: year
            });
        } else {
            return null;
        }
    }



    static isValidPicky(state) {
        if(typeof state === typeof {} && typeof state.calendars === typeof []) {
            return true;
        } else {
            console.warn('No valid picky data passed in.');
            return false;
        }
    }

    static getCalendarMonthViewData(state, name) {
        if (picky.isValidPicky(state)) {
            const calendar = state.calendars[name];
            if (calendar) {
                return viewDataHelpers.generateMonthViewData(calendar.view.month, calendar.view.year);
            } else {
                console.warn(`There is no calendar with the name: ${name} in this picky object.`);
                return state;
            }
        } else {
            return null;
        }
    }

    static getCalendarYearViewData(state, name) {
        if (picky.isValidPicky(state)) {
            const calendar = state.calendars[name];
            if (calendar) {
                return viewDataHelpers.generateYearViewData(calendar.view.year);
            } else {
                console.warn(`There is no calendar with the name: ${name} in this picky object.`);
                return state;
            }
        } else {
            return null;
        }
    }

    static moveCalendarViewForwardOneMonth(state, name) {
        if (picky.isValidPicky(state)) {
            const calendar = state.calendars[name];
            if (calendar) {
                return picky.setCalendarView(state, name, util.getDateOfFollowingMonth(calendar.view));
            } else {
                console.warn(`There is no calendar with the name: ${name} in this picky object.`);
                return state;
            }
        } else {
            return null;
        }
    }

    static moveCalendarViewBackwardOneMonth(state, name) {
        if (picky.isValidPicky(state)) {
            const calendar = state.calendars[name];
            if (calendar) {
                return picky.setCalendarView(state, name, util.getDateOfPrecedingMonth(calendar.view));
            } else {
                console.warn(`There is no calendar with the name: ${name} in this picky object.`);
                return state;
            }
        } else {
            return null;
        }
    }

    static create() {
        return {
            calendars: {},
            constraints: [],
            viewMode: 'month'
        };
    }
}



const datePickerData = picky.create();

const modifiedDatePickerData = picky.addCalendar(datePickerData, 'left', 20, 11, 2016);
const modifiedDatePickerData2 = picky.addCalendar(modifiedDatePickerData, 'right', 20, 9, 2016);

console.log(picky.setCalendarViewYear(modifiedDatePickerData2, 'left', 2018));

const addedConstraintPicker1 = picky.constrainViewToView(modifiedDatePickerData2, 'left', 'right', '>=');
console.log(addedConstraintPicker1)
const addedConstraintPicker2 = picky.constrainViewToSelection(addedConstraintPicker1, 'left', 'right', '==', 'limit');
console.log(addedConstraintPicker2)
const addedConstraintPicker3 = picky.constrainSelectionToSelection(addedConstraintPicker2, 'left', 'right', '==', 'cancel');
console.log(addedConstraintPicker3)
const addedConstraintPicker4 = picky.constrainSelectionToView(addedConstraintPicker3, 'left', 'right', '==');
console.log(addedConstraintPicker4)
const addedConstraintPicker5 = picky.constrainViewToDate(addedConstraintPicker4, 'right', {day: 5, month: 8, year: 2020}, '<=', 'cancel');
console.log(addedConstraintPicker5)
const addedConstraintPicker6 = picky.constrainSelectionToDate(addedConstraintPicker5, 'left', {day: 5, month: 8, year: 2010}, '>=', 'limit', true);
console.log(addedConstraintPicker6)
