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

    const d = ((h+5) % 7);
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
        31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
    return monthLengths[month-1];
}

const createDayObject = (day, weekday, month, year) => {
    return {
        day, weekday, month, year
    };
}


const generateMonthViewData = (month, year) => {
    const startWeekday = getWeekday(1, month, year);

    const precedingMonth = getPrecedingMonthNumber(month);
    const yearOfPrecedingMonth = precedingMonth === 12 ? year-1 : year;
    const daysInPrecedingMonth = getDaysInMonth(precedingMonth, year);

    const followingMonth = getFollowingMonthNumber(month);
    const yearOfFollowingMonth = followingMonth === 1 ? year+1 : year;


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
            yearOfPrecedingMonth
        ));
    }
    while(weeks[currentWeekIndex].length < 7 || currentDate <= daysInCurrentMonth) {
        if(weeks[currentWeekIndex].length === 7) {
            currentWeekIndex++;
            weeks[currentWeekIndex] = [];
        }
        if(currentDate <= daysInCurrentMonth) {
            weeks[currentWeekIndex].push(createDayObject(
                currentDate,
                weeks[currentWeekIndex].length+1,
                month,
                year
            ));
            currentDate++;
        } else {
            weeks[currentWeekIndex].push(createDayObject(
                currentDayInFollowingMonth,
                weeks[currentWeekIndex].length+1,
                followingMonth,
                yearOfFollowingMonth
            ));
            currentDayInFollowingMonth++;
        }
    }
    return weeks;
};

console.log(generateMonth(11, 2016));

































