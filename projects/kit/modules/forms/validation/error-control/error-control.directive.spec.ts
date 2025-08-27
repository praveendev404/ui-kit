import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    ErrorControlDirective,
    LibFormsModule,
    FORM_ERRORS
} from '@dagility-ui/kit';
import { By } from '@angular/platform-browser';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    template: `
        <div [formGroup]="formGroup">
            <input [formControlName]="'control'" />
        </div>
    `,
    standalone: false
})
class TestComponent {
    formGroup: UntypedFormGroup;

    constructor() {
        this.formGroup = new UntypedFormBuilder().group({
            control: [null, Validators.required]
        });
    }
}

describe('ErrorControlDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let errorControlDirective: DebugElement[];
    let testClass: ErrorControlDirective;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [LibFormsModule],
                declarations: [TestComponent, ErrorControlDirective],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        errorControlDirective = fixture.debugElement.queryAll(
            By.directive(ErrorControlDirective)
        );

        const param = {} as any;
        testClass = new ErrorControlDirective(
            FORM_ERRORS,
            param,
            param,
            param,
            param,
            param
        );

        testClass['cdr'] = { detectChanges: () => {} } as any;

        testClass['ngControl'] = {
            control: new UntypedFormControl()
        } as any;

        (testClass['ngControl'].control as any) = {
            ...testClass['ngControl'].control,
            invalid: true,
            dirty: true,
            errors: [
                {
                    errorKey: {}
                }
            ]
        };

        testClass['resolver'].resolveComponentFactory = (() => {}) as any;
        testClass['submit$'] = new BehaviorSubject(1);
    });

    it('should have errorControlDirective', () => {
        expect(errorControlDirective).not.toBeNull();
    });

    it('container should return object', () => {
        testClass['containerRef'] = {} as any;
        testClass['ngControl'] = {
            valueAccessor: { controlContainerRef: false }
        } as any;
        expect(testClass.container).toBeTruthy();
    });

    it('ngOnInit should be called', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();

        testClass.ngOnInit();
        (testClass['ngControl'].control.valueChanges as Subject<any>).next(1);
        (testClass['ngControl'].control.statusChanges as Subject<any>).next(1);

        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('ngOnInit should be called with another condition', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        spyOnProperty(testClass, 'container').and.returnValue({
            createComponent: () => ({
                instance: {
                    message: 'someMessage'
                }
            })
        });
        testClass['errors'] = { '0': () => {} };

        testClass.ngOnInit();
        (testClass['ngControl'].control.valueChanges as Subject<any>).next(1);
        (testClass['ngControl'].control.statusChanges as Subject<any>).next(1);

        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('ngOnInit should be called without showError', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();

        testClass['errors'] = { '0': () => {} };
        testClass.showError = false;

        testClass.ngOnInit();
        (testClass['ngControl'].control.valueChanges as Subject<any>).next(1);
        (testClass['ngControl'].control.statusChanges as Subject<any>).next(1);

        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('ngOnInit should be called without controlErrors', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        (testClass['ngControl'].control as any) = new UntypedFormControl();
        spyOnProperty(testClass, 'container').and.returnValue({
            createComponent: () => ({
                instance: {
                    message: 'someMessage'
                }
            })
        });

        testClass.ngOnInit();
        (testClass['ngControl'].control.valueChanges as Subject<any>).next(1);
        (testClass['ngControl'].control.statusChanges as Subject<any>).next(1);

        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('ngOnInit should be called with errorContainer', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        (testClass['ngControl'].control as any) = new UntypedFormControl();
        (testClass['errorContainerRef'] as any) = { instance: {} };

        testClass.ngOnInit();
        (testClass['ngControl'].control.valueChanges as Subject<any>).next(1);
        (testClass['ngControl'].control.statusChanges as Subject<any>).next(1);

        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('ngOnInit should be called without control', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        testClass['ngControl'] = null;
        testClass.ngOnInit();

        expect(testClass.ngOnInit).toHaveBeenCalled();
    });
});
