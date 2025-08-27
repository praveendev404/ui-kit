import { DateTimeModel } from '@dagility-ui/kit';

describe('DateTimeModel', () => {
    let dateTimeModel: DateTimeModel;

    beforeEach(() => {
        dateTimeModel = new DateTimeModel(
            DateTimeModel.fromLocalString('2000-01-01')
        );
    });

    it('should be created', () => {
        expect(dateTimeModel).toBeTruthy();
    });

    it('fromLocalString should be called with invalid date', () => {
        spyOn(DateTimeModel, 'fromLocalString').and.callThrough();
        DateTimeModel.fromLocalString('invalidDate');
        expect(DateTimeModel.fromLocalString).toHaveBeenCalled();
    });

    it('toString should be called', () => {
        spyOn(dateTimeModel, 'toString').and.callThrough();
        dateTimeModel.timeZoneOffset = 1;
        dateTimeModel.toString();
        expect(dateTimeModel.toString).toHaveBeenCalled();
    });

    it('toString should be called with another conditions', () => {
        spyOn(dateTimeModel, 'toString').and.callThrough();
        dateTimeModel.hour = dateTimeModel.timeZoneOffset = 0;
        dateTimeModel.minute = dateTimeModel.second = 1;
        dateTimeModel.toString();
        expect(dateTimeModel.toString).toHaveBeenCalled();
    });

    it('toString should be called with empty object', () => {
        dateTimeModel = new DateTimeModel();
        spyOn(dateTimeModel, 'toString').and.callThrough();

        dateTimeModel.toString();
        expect(dateTimeModel.toString).toHaveBeenCalled();
    });
});
