'use strict';

import viewDataHelpers from './viewDataHelpers';

class picky {

    static addCalendar(state, name, startDay, startMonth, startYear) {
         if (picky.isValidPicky(state)) {
            const currentDate = new Date();
            const calendars = {...state.calendars};
            calendars[name] = {
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
            };

            return {
                ...state,
                calendars: calendars
            };
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
                return {
                    // TODO
                    ...state,
                    calendars: calendars
                };
            } else {
                console.warn(`There is no calendar with the name: ${name} in this picky object.`);
                return state;
            }
        } else {
            return null;
        }
    }

    static generateDatePicker() {
        return {
            calendars: {},
            viewMode: 'month',
        };
    }
}

const datePickerData = picky.generateDatePicker();
console.log(datePickerData.calendars.length);
console.log(datePickerData);

const modifiedDatePickerData = picky.addCalendar(datePickerData, 'left', 20, 10, 2016);
console.log(modifiedDatePickerData);
console.log(modifiedDatePickerData.calendars.length);
const modifiedDatePickerData2 = picky.addCalendar(modifiedDatePickerData, 'right');
console.log(modifiedDatePickerData2);
console.log(modifiedDatePickerData2.calendars.length);
console.log(picky.getCalendarViewData(modifiedDatePickerData2, 'left'));