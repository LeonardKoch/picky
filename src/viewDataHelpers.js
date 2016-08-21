"use strict";

import util from './util';

class viewDataHelpers {

    static createDayObject(day, weekday, month, year, constraints) {

        const dayObj = {
            day, weekday, month, year
        };

        viewDataHelpers.getDateComparatives()

        return dayObj;
    }

    static generateYearViewData(year) {
        const isLeapYear = util.isLeapYear(year);
        return {
            year: year,
            isLeapYear: isLeapYear,
            numberOfDays: isLeapYear ? 366: 365,
            months: (new Array(12))
                    .fill(0)
                    .map((value, index) => index+1)
                    .map((monthNumber)  => viewDataHelpers.generateMonthViewData(monthNumber, year))
        };
    }

    static getDateComparatives(date, constraints) {
        // Implement stuff from checkConstraintViolation
        // return
    }

    static generateMonthViewData(month, year, constraints) {
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
                yearOfPrecedingMonth,
                constraints
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
                    year,
                    constraints
                ));
                currentDate++;
            } else {
                weeks[currentWeekIndex].push(viewDataHelpers.createDayObject(
                    currentDayInFollowingMonth,
                    weeks[currentWeekIndex].length+1,
                    followingMonth,
                    yearOfFollowingMonth,
                    constraints
                ));
                currentDayInFollowingMonth++;
            }
        }
        return {
            month: month,
            year: year,
            weeks: weeks,
        };
    }
}

module.exports = viewDataHelpers;