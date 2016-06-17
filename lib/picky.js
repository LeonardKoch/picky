'use strict';

import viewDataHelpers from './viewDataHelpers';

class picky {

    static addCalendar(state, name, startYear, startMonth, startDay) {
        const currentDate = new Date();
        return {
            ...state,
            calendars: [
                ...state.calendars,
                {
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
                }
            ]
        };
    }

    static isValidPicky(state) {
        return typeof state === typeof {} && typeof state.calendars === typeof [];
    }

    static getCalendarViewData(state, name) {
        if (picky.isValidPicky(state)) {
            /*
            const calendar =
            if (state.calendars.) {

            }*/
            const calendar = state.calendars
        } else {
            console.warn('No picky data passed in.');
            return null;
        }
    }

    static generateDatePicker() {
        return {
            calendars: [],
            viewMode: 'month',
        };
    }
}

const datePickerData = picky.generateDatePicker();
console.log(datePickerData);

const modifiedDatePickerData = picky.addCalendar(datePickerData, 'left', 10, 2015, 20);
console.log(modifiedDatePickerData);
const modifiedDatePickerData2 = picky.addCalendar(datePickerData);
console.log(modifiedDatePickerData2);