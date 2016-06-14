const currentDate = new Date();

const datePickerData = {
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

const isLeapYear = (year) => {
    if (year%4 !== 0) {
        return false;
    } else if (year%100 !== 0) {
        return true;
    } else if (year%400 !== 0) {
        return false;
    } else {
        return true;
    }
}

const getWeekday = (day, month, year) => {
    // Implementing Zeller's congruence
    // https://en.wikipedia.org/wiki/Zeller%27s_congruence

    const q = day;
    let m;
    let potentiallyShiftedYear;
    if (month <= 2) {
        m = month+12;
        potentiallyShiftedYear = year-1;
    } else {
        m = month;
        potentiallyShiftedYear = year;
    }
    const K = potentiallyShiftedYear % 100;
    const J = Math.floor(potentiallyShiftedYear / 100);

    const h = (q + Math.floor(13*(m + 1) / 5) + K + Math.floor(K/4) + Math.floor(J/4) + 5*J) % 7;

    const d = ((h+5) % 7) + 1;
    return d;
}

const getFollowingMonthNumber = (month) => {
    if (month === 12) {
        return 1;
    } else {
        return month + 1;
    }
};

const getPrecedingMonthNumber = (month) => {
    if (month === 1) {
        return 12;
    } else {
        return month - 1;
    }
};

const getDaysInMonth = (month, year) => {
    const monthLengths = [
        31,
        isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];
    return monthLengths[month-1];
}


const generateMonth = (month, year) => {
    const startWeekday = getWeekday(1, month, year);

    const precedingMonth = getPrecedingMonthNumber(month);
    const daysInPrecedingMonth = getDaysInMonth(precedingMonth, year);
    const followingMonth = getFollowingMonthNumber(month);

    const weeks = [];

    let currentDate = 1;
    let currentWeek = 0;

    weeks[0] = [];

    for (var i = 0; i < startWeekday; i++) {
        weeks[0].push(daysInPrecedingMonth - (startWeekday-1) + i)
    }
    console.log(daysInPrecedingMonth);
    console.log(startWeekday);
    console.log(weeks);
    return weeks;
};

generateMonth(6, 2016);