import {
    isLeapYear,
    aEqualToB,
    getWeekday,
    getPrecedingMonthNumber,
    getDaysInMonth,
    getFollowingMonthNumber,
    aBetweenBAndC,
    aBeforeB,
    aAfterB
} from './util';

export function transformDay(viewData, transformFunction) {
    return {
        ...viewData,
        weeks: viewData.weeks.map(week => week.map(day => transformFunction(day, viewData.month, viewData.year)))
    };
}

export function createDayObject(day, weekday, month, year) {
    return {
        day, weekday, month, year
    };
}

export function getInBetweenFlags(date, calendars) {
    return calendars.reduce((inBetween, calendar) => {
        inBetween[calendar.name] = {};
        calendars.filter(cal => cal.name !== calendar.name).forEach((nestedCalendar) => {
            const isInBetween = aBetweenBAndC(date, calendar.selection, nestedCalendar.selection);
            inBetween[calendar.name][nestedCalendar.name] = isInBetween;
            inBetween.any = inBetween.any || isInBetween;
        });
        return inBetween;
    }, {});
}

export function getBeforeFlags(date, calendars) {
    return calendars.reduce((isBefore, calendar) => {
        isBefore[calendar.name] = aBeforeB(date, calendar.selection);
        return isBefore;
    }, {});
}

export function getAfterFlags(date, calendars) {
    return calendars.reduce((isAfter, calendar) => {
        isAfter[calendar.name] = aAfterB(date, calendar.selection);
        return isAfter;
    }, {});
}

export function getSelectionFlags(date, calendars) {
    return calendars.reduce((isSelectedBy, calendar) => {
        isSelectedBy[calendar.name] = aEqualToB(date, calendar.selection);
        return isSelectedBy;
    }, {});
}


export function isDateInDateList(date, dateList) {
    return dateList.some((currentDate) => aEqualToB(date, currentDate));
}

export function enrichViewDataWithSelections(viewData, pickyData) {
    const calendars = Object.keys(pickyData.calendars).map(calendarName => pickyData.calendars[calendarName]);
    const selections = calendars.map(calendar => calendar.selection);
    return transformDay(viewData, (dayObj) => {
        dayObj.isSelected = isDateInDateList(dayObj, selections);
        dayObj.isSelectedBy = getSelectionFlags(dayObj, calendars);
        dayObj.inBetween = getInBetweenFlags(dayObj, calendars);
        dayObj.isBefore = getBeforeFlags(dayObj, calendars);
        dayObj.isAfter = getAfterFlags(dayObj, calendars);
        return dayObj;
    });
}

export function generateMonthViewData(month, year) {
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

    for (let i = 0; i < startWeekday; i += 1) {
        weeks[currentWeekIndex].push(createDayObject(
            (daysInPrecedingMonth - startWeekday) + 1 + i,
            i,
            precedingMonth,
            yearOfPrecedingMonth
        ));
    }
    while (weeks[currentWeekIndex].length < 7 || currentDate <= daysInCurrentMonth) {
        if (weeks[currentWeekIndex].length === 7) {
            currentWeekIndex += 1;
            weeks[currentWeekIndex] = [];
        }
        if (currentDate <= daysInCurrentMonth) {
            weeks[currentWeekIndex].push(createDayObject(
                currentDate,
                weeks[currentWeekIndex].length + 1,
                month,
                year
            ));
            currentDate += 1;
        } else {
            weeks[currentWeekIndex].push(createDayObject(
                currentDayInFollowingMonth,
                weeks[currentWeekIndex].length + 1,
                followingMonth,
                yearOfFollowingMonth
            ));
            currentDayInFollowingMonth += 1;
        }
    }
    return {
        month,
        year,
        weeks
    };
}

export function generateYearViewData(year) {
    const currentYearIsLeapYear = isLeapYear(year);
    return {
        year,
        isLeapYear: currentYearIsLeapYear,
        numberOfDays: currentYearIsLeapYear ? 366 : 365,
        months: (new Array(12))
            .fill(0)
            .map((value, index) => index + 1)
            .map((monthNumber) => generateMonthViewData(monthNumber, year))
    };
}
