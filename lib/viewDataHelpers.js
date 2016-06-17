"use strict";

import util from './util';

class viewDataHelpers {

    static createDayObject(day, weekday, month, year) {
        return {
            day, weekday, month, year
        };
    }


    static generateMonthViewData(month, year) {
        const startWeekday = util.getWeekday(1, month, year);

        const precedingMonth = util.getPrecedingMonthNumber(month);
        const yearOfPrecedingMonth = precedingMonth === 12 ? year-1 : year;
        const daysInPrecedingMonth = util.getDaysInMonth(precedingMonth, year);

        const followingMonth = util.getFollowingMonthNumber(month);
        const yearOfFollowingMonth = followingMonth === 1 ? year+1 : year;


        const daysInCurrentMonth = util.getDaysInMonth(month, year);

        const weeks = [];

        let currentDate = 1;
        let currentWeekIndex = 0;
        let currentDayInFollowingMonth = 1;

        weeks[currentWeekIndex] = [];

        for (var i = 0; i < startWeekday; i++) {
            weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(
                daysInPrecedingMonth - startWeekday + 1 + i,
                i,
                precedingMonth,
                yearOfPrecedingMonth
            ));
        }
        while(weeks[currentWeekIndex].length < 7 || currentDate <= daysInCurrentMonth) {
            if(weeks[currentWeekIndex].length === 7) {
                currentWeekIndex++;
                weeks[currentWeekIndex] = [];
            }
            if(currentDate <= daysInCurrentMonth) {
                weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(
                    currentDate,
                    weeks[currentWeekIndex].length+1,
                    month,
                    year
                ));
                currentDate++;
            } else {
                weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(
                    currentDayInFollowingMonth,
                    weeks[currentWeekIndex].length+1,
                    followingMonth,
                    yearOfFollowingMonth
                ));
                currentDayInFollowingMonth++;
            }
        }
        return weeks;
    }
}

module.exports = viewDataHelpers;