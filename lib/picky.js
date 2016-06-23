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

    static setCalendarView(state, name, view) {
        if (picky.isValidPicky(state)) {
            return picky.setCalendar(state, name, {
                ...state.calendars[name],
                view: view
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

    static getCalendarViewData(state, name) {
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

console.log(util);
console.log(util.getDateOfFollowingMonth);
console.log(util.getWeekday);

const datePickerData = picky.create();
console.log(datePickerData.calendars.length);
console.log(datePickerData);

const modifiedDatePickerData = picky.addCalendar(datePickerData, 'left', 20, 11, 2016);
console.log(modifiedDatePickerData);
console.log(modifiedDatePickerData.calendars.length);
const modifiedDatePickerData2 = picky.addCalendar(modifiedDatePickerData, 'right');
console.log(modifiedDatePickerData2);
console.log(modifiedDatePickerData2.calendars.length);

console.log(modifiedDatePickerData2.calendars);
const movedDatePickerData = picky.moveCalendarViewForwardOneMonth(modifiedDatePickerData2, 'left');
console.log(movedDatePickerData.calendars);
const movedDatePickerData2 = picky.moveCalendarViewForwardOneMonth(movedDatePickerData, 'left');
console.log(movedDatePickerData2.calendars);