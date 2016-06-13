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

console.log(getWeekday(1, 3, 2016));
/*
const getWeekday = (day, month, year) => {
    const monthValues = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4,]
}
/*
const generateMonth = (month, year) => {
    const startWeekday =

    const weeks = [];
    weeks.

    return
}
*/
const generateViewData = (data) => {

}