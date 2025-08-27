import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatepickerMultiMonthViewComponent } from '@dagility-ui/kit';

describe('DatepickerMultiMonthViewComponent', () => {
    let component: DatepickerMultiMonthViewComponent;
    let fixture: ComponentFixture<DatepickerMultiMonthViewComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DatepickerMultiMonthViewComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DatepickerMultiMonthViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.currentDate = new Date();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('getMonths should be called', () => {
        spyOn(component, 'getMonths').and.callThrough();
        component.getMonths(new Date());
        expect(component.getMonths).toHaveBeenCalled();
    });

    it('transformDate should be called', () => {
        spyOn(component, 'transformDate').and.callThrough();
        component.transformDate(new Date(), '');
        expect(component.transformDate).toHaveBeenCalled();
    });

    it('pickMonth should call selectDate emit', () => {
        spyOn(component.selectDate, 'emit').and.callThrough();
        component.pickMonth(new Date());
        expect(component.selectDate.emit).toHaveBeenCalledWith(
            component.currentDate
        );
    });

    it('pickYear should assign yearsMode to false', () => {
        component.pickYear(new Date());
        expect(component.yearsMode).toBeFalse();
    });

    it('changeYear should be called', () => {
        spyOn(component, 'changeYear').and.callThrough();
        const date = new Date();
        component.changeYear(date, 0);
        expect(component.changeYear).toHaveBeenCalledWith(date, 0);
    });

    it('changeYearsSet should be called', () => {
        spyOn(component, 'changeYearsSet').and.callThrough();
        component.changeYearsSet(0);
        expect(component.changeYearsSet).toHaveBeenCalled();
    });

    it('turnMode should invert yearsMode', () => {
        component.yearsMode = true;
        component.turnMode();
        expect(component.yearsMode).toBeFalse();
    });
});
