const currentDate = new Date();
const viewDataHelpers = require('./viewDataHelpers');

const datePickerData = {

};

class picky {
    static generateDatePicker() {
        return {
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



console.log(viewDataHelpers.generateMonthViewData(11, 2016));
//console.log(generateMonthViewData(11, 2016));

































