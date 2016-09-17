"use strict";

import {
    isLeapYear,
    aEqualToB,
    getWeekday,
    getPrecedingMonthNumber,
    getDaysInMonth,
    getFollowingMonthNumber,
} from './util';

export function createDayObject(day, weekday, month, year, constraints, selections) {

    const dayObj = {
        day, weekday, month, year
    };

    dayObj.isSelected = isDateInDateList(dayObj, selections);

    //getDateComparatives()

    return dayObj;
}

export function generateYearViewData(year) {
    const isLeapYear = isLeapYear(year);
    return {
        year: year,
        isLeapYear: isLeapYear,
        numberOfDays: isLeapYear ? 366 : 365,
        months: (new Array(12))
            .fill(0)
            .map((value, index) => index + 1)
            .map((monthNumber) => generateMonthViewData(monthNumber, year))
    };
}

export function getDateComparatives(date, constraints) {
    // Implement stuff from checkConstraintViolation
    // return
}

export function isDateInDateList(date, dateList) {
    return dateList.some((currentDate) => aEqualToB(date, currentDate));
}

export function generateMonthViewData(month, year, constraints, selections) {
    const startWeekday = getWeekday(1, month, year);

    const precedingMonth = getPrecedingMonthNumber(month);
    const yearOfPrecedingMonth = precedingMonth === 12 ? year - 1 : year;
    const daysInPrecedingMonth = getDaysInMonth(precedingMonth, year);

    const followingMonth = getFollowingMonthNumber(month);
    const yearOfFollowingMonth = followingMonth === 1 ? year + 1 : year;

    const daysInCurrentMonth = getDaysInMonth(month, year);

    const weeks = [];

    let currentDate = 1;
    let currentWeekIndex = 0;
    let currentDayInFollowingMonth = 1;

    weeks[currentWeekIndex] = [];

    for (var i = 0; i < startWeekday; i++) {
        weeks[currentWeekIndex].push(createDayObject(
            daysInPrecedingMonth - startWeekday + 1 + i,
            i,
            precedingMonth,
            yearOfPrecedingMonth,
            constraints,
            selections
        ));
    }
    while (weeks[currentWeekIndex].length < 7 || currentDate <= daysInCurrentMonth) {
        if (weeks[currentWeekIndex].length === 7) {
            currentWeekIndex++;
            weeks[currentWeekIndex] = [];
        }
        if (currentDate <= daysInCurrentMonth) {
            weeks[currentWeekIndex].push(createDayObject(
                currentDate,
                weeks[currentWeekIndex].length + 1,
                month,
                year,
                constraints,
                selections
            ));
            currentDate++;
        } else {
            weeks[currentWeekIndex].push(createDayObject(
                currentDayInFollowingMonth,
                weeks[currentWeekIndex].length + 1,
                followingMonth,
                yearOfFollowingMonth,
                constraints,
                selections
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
