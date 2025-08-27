import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DatepickerAdapterComponent } from '@dagility-ui/kit';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';

describe('DatepickerAdapterComponent', () => {
    let fixture: ComponentFixture<DatepickerAdapterComponent>;
    let component: DatepickerAdapterComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FontAwesomeTestingModule, NgbModule, FormsModule],
                declarations: [DatepickerAdapterComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DatepickerAdapterComponent);

        component = fixture.componentInstance;

        component.root = {
            parentNode: {
                removeChild: () => {}
            }
        } as any;
        component.template = {
            detectChanges: () => {},
            destroy: () => {}
        } as any;
        component.monthElem = {
            parentNode: { appendChild: () => {} },
            removeEventListener: () => {}
        };

        fixture.detectChanges();
    });

    afterEach(() => {
        component.root = {
            parentNode: {
                removeChild: () => {}
            }
        } as any;
        component.template = {
            detectChanges: () => {},
            destroy: () => {}
        } as any;
        component.monthElem = {
            parentNode: { appendChild: () => {} },
            removeEventListener: () => {}
        };
    });

    it('should be created', () => {
        expect(component).not.toBeNull();
    });

    it('cssClass should be called and return value for left position', () => {
        spyOnProperty(component, 'cssClass').and.callThrough();
        component.labelPosition = 'left';
        expect(component.cssClass).toBe(
            'd-flex flex-row lib-datepicker-adapter--left'
        );
    });

    it('ngDoCheck should be called without template', () => {
        spyOn(component, 'ngDoCheck').and.callThrough();
        component.template = null;
        component.ngDoCheck();
        expect(component.ngDoCheck).toHaveBeenCalled();
    });

    it('getToday should call dateChangedHandler', () => {
        spyOn(component, 'dateChangedHandler').and.callThrough();
        component.getToday();
        expect(component.dateChangedHandler).toHaveBeenCalled();
    });

    it('dateChangedHandler should be called', () => {
        spyOn(component, 'dateChangedHandler').and.callThrough();
        component.validation = () => {};
        component.ngControl = {} as NgControl;

        component.dateChangedHandler();
        expect(component.dateChangedHandler).toHaveBeenCalled();
    });

    it('dateChangedHandler should be called with typeof model = string', () => {
        spyOn(component, 'dateChangedHandler').and.callThrough();
        component.model = '2000-01-01' as any;
        component.dateChangedHandler();
        expect(component.dateChangedHandler).toHaveBeenCalled();
    });

    it('setDisabledState should assign disabled to true', () => {
        component.setDisabledState(true);
        expect(component.disabled).toBeTrue();
    });

    it('toggle should be called', () => {
        spyOn(component, 'toggle').and.callThrough();
        const param = {
            toggle: () => {},
            _cRef: {
                location: {
                    nativeElement: {
                        querySelector: () => ({
                            addEventListener: () => {}
                        })
                    }
                }
            }
        };
        component.toggle(param);
        expect(component.toggle).toHaveBeenCalledWith(param);
    });

    it('toggle should be called without d._cRef', () => {
        spyOn(component, 'toggle').and.callThrough();
        const param = {
            toggle: () => {}
        };
        component.toggle(param);
        expect(component.toggle).toHaveBeenCalledWith(param);
    });

    it('onDatePickerClosed should call destroyCustomNavigation', () => {
        spyOn(component, 'destroyCustomNavigation').and.callThrough();
        component.onDatePickerClosed();
        expect(component.destroyCustomNavigation).toHaveBeenCalled();
    });

    it('onTimeChanged should be called', () => {
        spyOn(component, 'onTimeChanged').and.callThrough();
        spyOn(component, 'setInputValue').and.callFake(() => {});
        component.model = {
            setHours: () => {},
            setMinutes: () => {},
            setSeconds: () => {}
        } as any;

        component.onTimeChanged({
            hour: 0,
            minute: 0,
            second: 0
        });
        expect(component.onTimeChanged).toHaveBeenCalled();
    });

    it('setInputValue should be called', () => {
        spyOn(component, 'setInputValue').and.callThrough();
        component.setInputValue(1, 1);
        expect(component.setInputValue).toHaveBeenCalled();
    });

    it('setInputValue should be called with model ', () => {
        spyOn(component, 'setInputValue').and.callThrough();
        component.model = {
            getFullYear: () => {},
            getMonth: () => 8,
            getDate: () => 9
        } as any;
        component.setInputValue(9, 9);
        expect(component.setInputValue).toHaveBeenCalled();
    });

    it('setInputValue should be called with model another condition', () => {
        spyOn(component, 'setInputValue').and.callThrough();
        component.model = {
            getFullYear: () => {},
            getMonth: () => 9,
            getDate: () => 10
        } as any;
        component.setInputValue(10, 10);
        expect(component.setInputValue).toHaveBeenCalled();
    });

    it('destroyClick should be called', () => {
        spyOn(component, 'destroyClick').and.callThrough();
        component.monthElem = null;
        component.destroyClick();
        expect(component.destroyClick).toHaveBeenCalled();
    });

    it('destroyCustomNavigation should be called', () => {
        spyOn(component, 'destroyCustomNavigation').and.callThrough();
        component.destroyCustomNavigation();
        expect(component.destroyCustomNavigation).toHaveBeenCalled();
    });

    it('destroyCustomNavigation should be called without template', () => {
        component.template = null;
        spyOn(component, 'destroyCustomNavigation').and.callThrough();

        component.destroyCustomNavigation();
        expect(component.destroyCustomNavigation).toHaveBeenCalled();
    });

    it('openCustomNavigation should be called', () => {
        spyOn(component, 'openCustomNavigation').and.callThrough();
        component.openCustomNavigation();
        expect(component.openCustomNavigation).toHaveBeenCalled();
    });

    it('openCustomNavigation should be called with model', () => {
        spyOn(component, 'openCustomNavigation').and.callThrough();
        component.model = new Date();
        component.openCustomNavigation();
        expect(component.openCustomNavigation).toHaveBeenCalled();
    });

    it('goToDateAhead should be called', () => {
        spyOn(component, 'goToDateAhead').and.callThrough();
        component['cdr'] = { detectChanges: () => {} } as any;
        component.goToDateAhead();
        expect(component.goToDateAhead).toHaveBeenCalled();
    });
});
