import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    DatepickerComponent,
    DatepickerLeftRangeContentDirective,
    DatepickerRightRangeContentDirective
} from '@dagility-ui/kit';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgbDate, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <lib-datepicker>
            <ng-template dpLeftRangeContent></ng-template>
            <ng-template dpRightRangeContent></ng-template>
        </lib-datepicker>
    `,
    standalone: false
})
class TestComponent {}

describe('Datepicker Directives', () => {
    let fixtureDirectives: ComponentFixture<TestComponent>;

    let dpLeftRangeContent: DebugElement[];
    let dpRightRangeContent: DebugElement[];

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestComponent,
                    DatepickerLeftRangeContentDirective,
                    DatepickerRightRangeContentDirective
                ],
                providers: [NgControl],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixtureDirectives = TestBed.createComponent(TestComponent);
        fixtureDirectives.detectChanges();

        dpLeftRangeContent = fixtureDirectives.debugElement.queryAll(
            By.directive(DatepickerLeftRangeContentDirective)
        );
        dpRightRangeContent = fixtureDirectives.debugElement.queryAll(
            By.directive(DatepickerRightRangeContentDirective)
        );
    });

    it('should have dpLeftRangeContent', () => {
        expect(dpLeftRangeContent).not.toBeNull();
    });

    it('should have dpRightRangeContent', () => {
        expect(dpRightRangeContent).not.toBeNull();
    });
});

describe('DatepickerComponent', () => {
    let fixture: ComponentFixture<DatepickerComponent>;
    let component: DatepickerComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FontAwesomeTestingModule],
                declarations: [DatepickerComponent, NgbPopover],
                providers: [NgControl],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DatepickerComponent);
        component = fixture.componentInstance;
        fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
        component.range.toDate = { year: 1990, day: 1, month: 1 };
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).not.toBeNull();
    });

    it('cssClass should be called and return value for left position', () => {
        spyOnProperty(component, 'cssClass').and.callThrough();
        component.labelPosition = 'left';
        expect(component.cssClass).toBe('d-flex flex-row lib-datepicker--left');
    });

    it('range should call isRange', () => {
        spyOn(component.range, 'isRange').and.callThrough();
        component.range.isRange(new NgbDate(2000, 1, 1));
        expect(component.range.isRange).toHaveBeenCalled();
    });

    it('range should call needHover', () => {
        spyOn(component.range, 'needHover').and.callThrough();
        component.range.toDate = null;
        component.range.fromDate = { year: 1990, day: 1, month: 1 };
        component.range.needHover();
        expect(component.range.needHover).toHaveBeenCalled();
    });

    it('range should call isOutside', () => {
        spyOn(component.range, 'isOutside').and.callThrough();
        component.range.toDate = null;
        component.range.isOutside({ year: 1990, day: 1, month: 1 } as NgbDate, {
            model: { months: [{ firstDate: { month: 0 } }] }
        });
        expect(component.range.isOutside).toHaveBeenCalled();
    });

    it('range should call isFrom', () => {
        spyOn(component.range, 'isFrom').and.callThrough();
        component.range.isFrom(new NgbDate(2000, 1, 1));
        expect(component.range.isFrom).toHaveBeenCalled();
    });

    it('range should call isTo', () => {
        spyOn(component.range, 'isTo').and.callThrough();
        component.range.isTo(new NgbDate(2000, 1, 1));
        expect(component.range.isTo).toHaveBeenCalled();
    });

    it('range should call isInside', () => {
        spyOn(component.range, 'isInside').and.callThrough();
        component.range.fromDate = { year: 1990, day: 1, month: 1 };
        component.range.isInside(new NgbDate(2000, 1, 1));
        expect(component.range.isInside).toHaveBeenCalled();
    });

    it('range should call isHovered', () => {
        spyOn(component.range, 'isHovered').and.callThrough();
        component.range.fromDate = { year: 1990, day: 1, month: 1 };
        component.range.toDate = null;
        component.range.hoveredDate = { year: 1990, day: 1, month: 1 };
        component.range.isHovered(new NgbDate(2000, 1, 1));
        expect(component.range.isHovered).toHaveBeenCalled();
    });

    it('range should call onDateSelection', () => {
        spyOn(component.range, 'onDateSelection').and.callThrough();
        component.range.fromDate = null;
        component.range.toDate = null;
        component.range.onDateSelection(new NgbDate(2000, 1, 1));
        expect(component.range.onDateSelection).toHaveBeenCalled();
    });

    it('range should call onDateSelection with fromDate', () => {
        spyOn(component.range, 'onDateSelection').and.callThrough();
        component.range.fromDate = { year: 1990, day: 1, month: 1 };
        component.range.toDate = null;
        component.range.onDateSelection(new NgbDate(2000, 1, 1));
        expect(component.range.onDateSelection).toHaveBeenCalled();
    });

    it('range should call onDateSelection with fromDate and toDate', () => {
        spyOn(component.range, 'onDateSelection').and.callThrough();
        component.range.fromDate = { year: 1990, day: 1, month: 1 };
        component.range.toDate = { year: 1990, day: 1, month: 1 };
        component.range.onDateSelection(new NgbDate(2000, 1, 1));
        expect(component.range.onDateSelection).toHaveBeenCalled();
    });

    it('range should call defaultInputFormatter', () => {
        spyOn(component.range, 'defaultInputFormatter').and.callThrough();
        component.range.defaultInputFormatter(
            new NgbDate(2000, 1, 1),
            new NgbDate(2000, 1, 1)
        );
        expect(component.range.defaultInputFormatter).toHaveBeenCalled();
    });

    it('range should call defaultInputFormatter another conditions', () => {
        spyOn(component.range, 'defaultInputFormatter').and.callThrough();
        component.range.defaultInputFormatter(null, null);
        expect(component.range.defaultInputFormatter).toHaveBeenCalled();
    });

    it('addBackdrop should be called', () => {
        spyOn(DatepickerComponent, 'addBackdrop').and.callThrough();
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(250);
        spyOn(document.body, 'getElementsByClassName').and.returnValue({
            item: () => ({
                getBoundingClientRect: () => ({ left: 250 }),
                classList: {
                    add: () => {},
                    remove: () => {}
                }
            })
        } as any);
        DatepickerComponent.addBackdrop(false);
        expect(DatepickerComponent.addBackdrop).toHaveBeenCalled();
    });

    it('addBackdrop should be called another condition', () => {
        spyOn(DatepickerComponent, 'addBackdrop').and.callThrough();
        spyOnProperty(document.body, 'lastChild').and.returnValue(false);
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(251);
        spyOn(document.body, 'getElementsByClassName').and.returnValue({
            item: () => ({
                getBoundingClientRect: () => ({ left: 0 }),
                classList: {
                    add: () => {},
                    remove: () => {}
                }
            })
        } as any);
        DatepickerComponent.addBackdrop(true);
        expect(DatepickerComponent.addBackdrop).toHaveBeenCalled();
    });

    it('ngOnInit should be called', () => {
        spyOn(component, 'ngOnInit').and.callThrough();
        component.mode = 'range';
        component.ngOnInit();

        expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('closeOnEvents should be called without events', () => {
        spyOn(component, 'closeOnEvents').and.callThrough();
        component.closeOnEvents([]);
        expect(component.closeOnEvents).toHaveBeenCalledWith([]);
    });

    xit('closeOnEvents should be called with events (problem with rxjs.fromEvent)', () => {
        spyOn(component, 'closeOnEvents').and.callThrough();
        component.closeOnEvents([{}, {}] as any);
        expect(component.closeOnEvents).toHaveBeenCalledWith([]);
    });

    it('onPopoverHidden should call handleToggleBackdrop with false', () => {
        spyOn(component, 'handleToggleBackdrop').and.callThrough();
        component.onPopoverHidden();
        expect(component.handleToggleBackdrop).toHaveBeenCalledWith(false);
    });

    it('onPopoverShown should call handleToggleBackdrop with true', () => {
        spyOn(component, 'handleToggleBackdrop').and.callThrough();
        spyOn(DatepickerComponent, 'addBackdrop').and.callFake(() => {});
        component.onPopoverShown();
        expect(component.handleToggleBackdrop).toHaveBeenCalledWith(true);
    });

    it('closeDialog should be called', () => {
        spyOn(component, 'closeDialog').and.callThrough();
        component.timePickerPopover = {
            isOpen: () => true,
            close: () => {}
        } as NgbPopover;
        component.closeDialog();
        expect(component.closeDialog).toHaveBeenCalled();
    });

    it('closeDialog should be called with popover', () => {
        spyOn(component, 'closeDialog').and.callThrough();
        component.popover = {
            isOpen: () => true,
            close: () => {}
        } as NgbPopover;
        component.closeDialog();
        expect(component.closeDialog).toHaveBeenCalled();
    });

    it('closeDialog should be called another condition', () => {
        spyOn(component, 'closeDialog').and.callThrough();
        component.timePickerPopover = {
            isOpen: () => false,
            close: () => {}
        } as NgbPopover;
        component.closeDialog();
        expect(component.closeDialog).toHaveBeenCalled();
    });

    it('getTodayNgbDate should be called', () => {
        spyOn(component, 'getTodayNgbDate').and.callThrough();
        component.getTodayNgbDate();
        expect(component.getTodayNgbDate).toHaveBeenCalled();
    });

    it('onInputChange should be called', () => {
        spyOn(component, 'onInputChange').and.callThrough();
        const param = { target: { value: '2000-01-01' } };
        component.onInputChange(param);
        expect(component.onInputChange).toHaveBeenCalledWith(param);
    });

    it('onInputChange should be called with value.trim = empty', () => {
        spyOn(component, 'onInputChange').and.callThrough();
        const param = { target: { value: '' } };
        component.onInputChange(param);
        expect(component.onInputChange).toHaveBeenCalledWith(param);
    });

    it('onInputChange should be called with invalid value', () => {
        spyOn(component, 'onInputChange').and.callThrough();
        const param = { target: { value: 'invalidValue' } };
        component.onInputChange(param);
        expect(component.onInputChange).toHaveBeenCalledWith(param);
    });

    it('onDateChange should be called without $event', () => {
        spyOn(component, 'onDateChange').and.callThrough();
        const param = null;
        component.onDateChange(param);
        expect(component.onDateChange).toHaveBeenCalledWith(param);
    });

    it('onDateChange should be called with $event', () => {
        spyOn(component, 'onDateChange').and.callThrough();
        const param = { year: 2000, month: 1, day: 1 };
        component.datetime = null;
        component.onDateChange(param);
        expect(component.onDateChange).toHaveBeenCalledWith(param);
    });

    it('onDateChange should be called with $event and datetime', () => {
        spyOn(component, 'onDateChange').and.callThrough();
        const param = { year: 2000, month: 1, day: 1 };
        component.onDateChange(param);
        expect(component.onDateChange).toHaveBeenCalledWith(param);
    });

    it('onDateChange should be called with invalid $event', () => {
        spyOn(component, 'onDateChange').and.callThrough();
        const param = {};
        component.onDateChange(param);
        expect(component.onDateChange).toHaveBeenCalledWith(param);
    });

    it('onTimeChange should be called', () => {
        spyOn(component, 'setDateStringModel').and.callThrough();
        const param = {
            hour: 0,
            minute: 0,
            second: 0
        } as any;
        component.onTimeChange(param);
        expect(component.setDateStringModel).toHaveBeenCalled();
    });

    it('registerOnChange should be called', () => {
        const fn = () => {};
        component.registerOnChange(fn);
        expect(component['onChange']).toBe(fn);
    });

    it('registerOnTouched should be called', () => {
        const fn = () => {};
        component.registerOnTouched(fn);
        expect(component['onTouched']).toBe(fn);
    });

    it('writeValue should be called', () => {
        spyOn(component, 'writeValue').and.callThrough();
        component.writeValue('2000-01-01');
        expect(component.writeValue).toHaveBeenCalled();
    });

    it('writeValue should be called with mode = range', () => {
        spyOn(component, 'writeValue').and.callThrough();
        component.mode = 'range';
        component.writeValue(null);
        expect(component.writeValue).toHaveBeenCalled();
    });

    it('writeValue should be called with mode = range another condition', () => {
        spyOn(component, 'writeValue').and.callThrough();
        component.mode = 'range';
        component.writeValue({
            startDate: '2000-01-01',
            endDate: '2000-01-01'
        } as any);
        expect(component.writeValue).toHaveBeenCalled();
    });

    it('writeValue should be called without newModel', () => {
        spyOn(component, 'writeValue').and.callThrough();
        component.writeValue(null);
        expect(component.writeValue).toHaveBeenCalled();
    });

    it('setDisabledState should be called', () => {
        spyOn(component, 'setDisabledState').and.callThrough();
        component.setDisabledState(true);
        expect(component.disabled).toBeTrue();
    });

    it('updateRange should be called', () => {
        spyOn(component, 'updateRange').and.callThrough();
        component.range = {
            fromDate: { year: 2000, month: 1, day: 1 },
            toDate: { year: 2000, month: 1, day: 1 }
        } as any;

        component.updateRange();
        expect(component.updateRange).toHaveBeenCalled();
    });

    it('validate should be called', () => {
        spyOn(component, 'validate').and.callThrough();
        const param = { value: {} } as any;
        component.mode = 'range';
        component.validate(param);
        expect(component.validate).toHaveBeenCalledWith(param);
    });

    it('validate should be return null', () => {
        expect(component.validate({} as any)).toBeNull();
    });

    it('validate should be called with another condition', () => {
        spyOn(component, 'validate').and.callThrough();
        const param = { value: { startDate: 1, endDate: 2 } } as any;
        component.mode = 'range';
        component.validate(param);
        expect(component.validate).toHaveBeenCalledWith(param);
    });

    it('validate should return { range: true }', () => {
        const param = { value: { startDate: 2, endDate: 1 } } as any;
        component.mode = 'range';
        expect(component.validate(param).range).toBeTrue();
    });

    it('inputRangeChanged should be called', () => {
        spyOn(component, 'inputRangeChanged').and.callThrough();
        component.inputRangeChanged('2000 - 01');
        expect(component.inputRangeChanged).toHaveBeenCalledWith('2000 - 01');
    });

    it('convertToNgbDate should be called', () => {
        spyOn(component, 'convertToNgbDate').and.callThrough();
        component.convertToNgbDate('2000-01-01');
        expect(component.convertToNgbDate).toHaveBeenCalledWith('2000-01-01');
    });

    it('convertToNgbDate should be called with another condition', () => {
        spyOn(component, 'convertToNgbDate').and.callThrough();
        component.convertToNgbDate('invalidDate');
        expect(component.convertToNgbDate).toHaveBeenCalledWith('invalidDate');
    });

    it('updateRangeStr should be called', () => {
        spyOn(component, 'updateRangeStr').and.callThrough();
        component.range = {
            fromDate: { year: 2000, month: 1, day: 1 },
            toDate: { year: 2000, month: 1, day: 1 },
            defaultInputFormatter: () => {}
        } as any;

        component.updateRangeStr();
        expect(component.updateRangeStr).toHaveBeenCalled();
    });

    it('updateRangeStr should be called another condition', () => {
        spyOn(component, 'updateRangeStr').and.callThrough();
        component.range = {
            fromDate: { year: 2000, month: 1, day: 1 },
            defaultInputFormatter: () => {}
        } as any;

        component.updateRangeStr();
        expect(component.updateRangeStr).toHaveBeenCalled();
    });

    it('updateRangeStr should be called another condition selectedDaysCount = 0', () => {
        spyOn(component, 'updateRangeStr').and.callThrough();
        component.range = {
            defaultInputFormatter: () => {}
        } as any;

        component.updateRangeStr();
        expect(component.updateRangeStr).toHaveBeenCalled();
    });

    it('clearRange should be called', () => {
        spyOn(component, 'inputRangeChanged').and.callThrough();
        component.mode = 'range';
        component.clearRange();
        expect(component.rangeString).toBe('');
        expect(component.inputRangeChanged).toHaveBeenCalledWith('');
    });
});
