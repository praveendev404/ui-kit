import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import {
    FormDirtyDirective,
    FormSubmitDirective,
    LibFormsModule
} from '@dagility-ui/kit';
import { By } from '@angular/platform-browser';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
    template: `
        <form [formGroup]="formGroup"></form>
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

describe('FormDirtyDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let formDirtyDirective: DebugElement[];
    let testClass: FormDirtyDirective;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [LibFormsModule],
                declarations: [TestComponent, FormDirtyDirective]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        formDirtyDirective = fixture.debugElement.queryAll(
            By.directive(FormDirtyDirective)
        );

        testClass = new FormDirtyDirective({
            submit$: of(1) as any
        } as FormSubmitDirective);

        testClass.form = {
            valueChanges: of('1'),
            markAsPristine: () => {},
            markAsDirty: () => {},
            valid: () => true
        } as any;
    });

    it('should have formDirtyDirective', () => {
        expect(formDirtyDirective).not.toBeNull();
    });

    it('ngOnInit should be called', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();

        testClass.ngOnInit();
        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('ngOnInit should be called with equals', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        spyOn<any>(testClass, 'isEqual').and.returnValue(true);
        testClass.listenFromSubmitEvent = false;
        testClass.ngOnInit();
        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('ngOnInit should be called without form and listenFromSubmitEvent', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        testClass.form = null;

        testClass.ngOnInit();
        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('ngOnDestroy should be called without subscription$', () => {
        spyOn(testClass, 'ngOnDestroy').and.callThrough();
        testClass['subscription$'] = null;
        testClass.ngOnDestroy();
        expect(testClass.ngOnDestroy).toHaveBeenCalled();
    });
});
