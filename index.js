const currentDate = new Date();

console.log(currentDate);

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

const getDoomsday = (day, month, year) => {
    //http://www.timeanddate.com/date/doomsday-weekday.html
    //http://www.timeanddate.com/date/doomsday-rule.html
    //https://programmingpraxis.com/2011/06/24/thank-god-its-friday/
}

const daysBefore = (year) => {
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
    const monthValues = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4,]
}

const generateMonth = (month, year) => {
    const startWeekday =

    const weeks = [];
    weeks.

    return
}

const generateViewData = (data) => {

}

console.log(generateViewData(datePickerData));