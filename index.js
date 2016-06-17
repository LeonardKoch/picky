'use strict';

const currentDate = new Date();
const viewDataHelpers = require('./viewDataHelpers');

class picky {

    static addCalendar(state, name, startMonth, startYear) {
        return {
            ...state,
            calendars: [
                ...state.calendars,
                {
                    name: name,
                    month: startMonth,
                    year: startYear
                }
            ]
        };
    }

    static generateDatePicker() {
        return {
            calendars: [],
            viewMode: 'month',
            view: {
                year: 2016,
                month: 1,
                day: 15
            },
            selected: {
                year: 2016,
                month: 1,
                day: 15
            }
        };
    }
}

const datePickerData = picky.generateDatePicker();
console.log(datePickerData);

const modifiedDatePickerData = picky.addCalendar(datePickerData, 'left', 10, 2015);
console.log(modifiedDatePickerData);