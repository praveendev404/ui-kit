import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ValidationErrorsComponent } from '@dagility-ui/kit';
import { UntypedFormControl } from '@angular/forms';

describe('ValidationErrorsComponent', () => {
    let fixture: ComponentFixture<ValidationErrorsComponent>;
    let component: ValidationErrorsComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ValidationErrorsComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ValidationErrorsComponent);
        component = fixture.componentInstance;

        component['control'] = new UntypedFormControl();
        (component['control'] as any) = {
            ...component['control'],
            control: {},
            attributes: {
                getNamedItem: () => ({
                    value: {}
                })
            },
            ngControl: {
                control: {}
            }
        };

        fixture.detectChanges();
    });

    it('should have ValidationErrorsComponent', () => {
        expect(component).not.toBeNull();
    });

    it('hasDisplayableError should be called', () => {
        spyOnProperty(component, 'formControl', 'get').and.returnValue({
            invalid: true,
            dirty: true,
            validator: true,
            errors: {
                someKey: 'someError'
            }
        });

        spyOnProperty(
            component,
            'hasDisplayableError',
            'get'
        ).and.callThrough();

        component.errorsDirective = [
            {
                valError: 'someError'
            }
        ] as any;

        expect(component.hasDisplayableError).toBeFalse();
    });

    it('hasDisplayableError should be called without errors', () => {
        spyOnProperty(component, 'formControl', 'get').and.returnValue({
            invalid: true,
            dirty: true,
            validator: true
        });

        spyOnProperty(
            component,
            'hasDisplayableError',
            'get'
        ).and.callThrough();
        expect(component.hasDisplayableError).toBeFalse();
    });

    it('formControl should be called with ngControl', () => {
        spyOnProperty(component, 'isNgControl').and.returnValue(true);
        expect(component.formControl).toBeTruthy();
    });

    it('formControl should be called with BaseControl', () => {
        spyOnProperty(component, 'isBaseControl').and.returnValue(true);
        expect(component.formControl).toBeTruthy();
    });

    it('formControl should be called with HTMLInputElement', () => {
        spyOnProperty(component, 'isHTMLInputElement').and.returnValue(true);
        spyOn(component, 'getControlByName').and.returnValue(true);
        expect(component.formControl).toBeTruthy();
    });

    it('formControl should be called with AbstractControl', () => {
        spyOnProperty(component, 'isAbstractControl').and.returnValue(true);
        expect(component.formControl).toBeTruthy();
    });

    it('displayedErrors should be called', () => {
        spyOnProperty(component, 'formControl', 'get').and.returnValue({
            hasError: () => true
        });
        component.errorsDirective = [
            {
                valError: 'someError'
            }
        ] as any;
        expect(component.displayedErrors).toEqual(
            component.errorsDirective as any
        );
    });

    it('getControlByName should be called', () => {
        spyOn(component, 'getControlByName').and.callThrough();
        component['controlContainer'] = {
            control: {
                controls: []
            }
        } as any;
        component.getControlByName('someValue');
        expect(component.getControlByName).toHaveBeenCalled();
    });
});
