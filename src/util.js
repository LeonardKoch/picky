"use strict";

export function isLeapYear(year) {
    if (year % 4 !== 0) {
        return false;
    } else if (year % 100 !== 0) {
        return true;
    } else if (year % 400 !== 0) {
        return false;
    } else {
        return true;
    }
}

export function aEqualToB(a, b) {
    return a.year === b.year && a.month === b.month && a.day === b.day;
}


export function aBeforeB(a, b) {
    return a.year < b.year
        || a.year === b.year && a.month < b.month
        || a.year === b.year && a.month === b.month && a.day < b.day;
}

export function aAfterB(a, b) {
    return a.year > b.year
        || a.year === b.year && a.month > b.month
        || a.year === b.year && a.month === b.month && a.day > b.day;
}

export function aBetweenBAndC(a, b, c) {
    return (aAfterB(a, b) && aBeforeB(a, c)) || (aBeforeB(a, b) && aAfterB(a, c));
}


export function getWeekday(day, month, year) {
    // Implementing Zeller's congruence
    // https://en.wikipedia.org/wiki/Zeller%27s_congruence

    const q = day;
    let m;
    let potentiallyShiftedYear;
    if (month <= 2) {
        m = month + 12;
        potentiallyShiftedYear = year - 1;
    } else {
        m = month;
        potentiallyShiftedYear = year;
    }
    const K = potentiallyShiftedYear % 100;
    const J = Math.floor(potentiallyShiftedYear / 100);

    const h = (q + Math.floor(13 * (m + 1) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + 5 * J) % 7;

    const d = ((h + 5) % 7);
    return d;
}

export function getFollowingMonthNumber(month) {
    if (month === 12) {
        return 1;
    } else {
        return month + 1;
    }
}

export function getPrecedingMonthNumber(month) {
    if (month === 1) {
        return 12;
    } else {
        return month - 1;
    }
}

export function getDateOfFollowingMonth(date) {
    const followingMonth = getFollowingMonthNumber(date.month);
    const yearOfFollowingMonth = followingMonth === 1 ? date.year + 1 : date.year;

    return {
        day: Math.min(date.day, getDaysInMonth(followingMonth, yearOfFollowingMonth)),
        month: followingMonth,
        year: yearOfFollowingMonth
    };
}

export function getDateOfPrecedingMonth(date) {
    const precedingMonth = getPrecedingMonthNumber(date.month);
    const yearOfPrecedingMonth = precedingMonth === 12 ? date.year - 1 : date.year;

    return {
        day: Math.min(date.day, getDaysInMonth(precedingMonth, yearOfPrecedingMonth)),
        month: precedingMonth,
        year: yearOfPrecedingMonth
    };
}

export function getDaysInMonth(month, year) {
    const monthLengths = [
        31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
    return monthLengths[month - 1];
}
