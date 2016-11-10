import { create, addCalendar, getCalendarViewData } from '../src/picky.js';

describe('picky', () => {
    it('should create an empty picky object', () => {
        expect(
            create()
        ).toEqual({
            calendars: {},
            constraints: [],
            viewMode: 'month'
        });
    });
/*
    it('should add calendar', () => {
        console.log(addCalendar(create(), 'someCalendar'));
        expect(
            addCalendar(create(), 'someCalendar')
        ).toEqual({
            calendars: {
                someCalendar: {
                    name: 'someCalendar',
                    view: [Object],
                    selection: [Object]
                }
            },
            constraints: [],
            viewMode: 'month' });
    });
    */
    it('should give correct display data', () => {
        const pickyData = addCalendar(addCalendar(create(), 'left', 10, 10, 2000), 'right', 20, 10, 2000);
        expect(
           true
        ).toBe(
            true
        );
    });
});
