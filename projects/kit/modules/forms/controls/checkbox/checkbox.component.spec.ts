import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckboxComponent } from '@dagility-ui/kit';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxInstance: CheckboxComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CheckboxComponent, SimpleCheckbox, FormCheckbox],
                imports: [ReactiveFormsModule]
            }).compileComponents();
        })
    );

    describe('simple checkbox', () => {
        let fixture: ComponentFixture<SimpleCheckbox>;

        beforeEach(() => {
            fixture = TestBed.createComponent(SimpleCheckbox);
            fixture.detectChanges();

            checkboxDebugElement = fixture.debugElement.query(
                By.directive(CheckboxComponent)
            );
            checkboxInstance = checkboxDebugElement.componentInstance;
            inputElement = checkboxDebugElement.nativeElement.querySelector(
                'input'
            ) as HTMLInputElement;
            labelElement = checkboxDebugElement.nativeElement.querySelector(
                'label'
            ) as HTMLLabelElement;
        });

        it('should add and remove the checked state', () => {
            fixture.componentInstance.isSelected = false;
            fixture.detectChanges();

            expect(checkboxInstance.value).toBeFalse();
            expect(inputElement.checked).toBeFalse();

            fixture.componentInstance.isSelected = true;
            fixture.detectChanges();

            expect(checkboxInstance.value).toBeTrue();
            expect(inputElement.checked).toBeTrue();
        });

        it('should toggle the checked state when clicking on label', () => {
            fixture.detectChanges();
            labelElement.click();

            expect(checkboxInstance.value).toBeTrue();
            expect(inputElement.checked).toBeTrue();

            labelElement.click();
            fixture.detectChanges();

            expect(checkboxInstance.value).toBeFalse();
            expect(inputElement.checked).toBeFalse();
        });

        it('should change from undefined state to checked on click', () => {
            fixture.componentInstance.undefinedState = true;
            fixture.componentInstance.isSelected = undefined;
            fixture.detectChanges();

            expect(inputElement.indeterminate).toBeTrue();
            expect(inputElement.checked).toBeFalse();
            expect(inputElement.checked).toBeFalse();

            inputElement.click();
            fixture.detectChanges();

            expect(inputElement.indeterminate).toBeFalse();
            expect(inputElement.checked).toBeTrue();
            expect(checkboxInstance.value).toBeTrue();
        });

        it('should project ng-content to label', () => {
            fixture.detectChanges();
            expect(labelElement.textContent.trim()).toBe('Simple checkbox');
        });

        it('should toggle disabled state', () => {
            fixture.componentInstance.disabled = false;
            fixture.detectChanges();
            expect(inputElement.disabled).toBeFalse();

            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(inputElement.disabled).toBeTrue();
        });

        it('should be disabled if loading = true', () => {
            fixture.componentInstance.isSelected = true;
            fixture.detectChanges();
            expect(inputElement.disabled).toBeFalse();
            expect(inputElement.checked).toBeTrue();

            fixture.componentInstance.loading = true;
            fixture.detectChanges();
            expect(inputElement.checked).toBeTrue();
            expect(inputElement.disabled).toBeTrue();
        });
    });

    describe('checkbox + reactive form', () => {
        let fixture: ComponentFixture<FormCheckbox>;

        beforeEach(() => {
            window['_'] = {
                clone: x => x
            };
            fixture = TestBed.createComponent(FormCheckbox);
            fixture.detectChanges();

            checkboxDebugElement = fixture.debugElement.query(
                By.directive(CheckboxComponent)
            );
            checkboxInstance = checkboxDebugElement.componentInstance;
            inputElement = checkboxDebugElement.nativeElement.querySelector(
                'input'
            ) as HTMLInputElement;
            labelElement = checkboxDebugElement.nativeElement.querySelector(
                'label'
            ) as HTMLLabelElement;
        });

        it('should toggle the checked state when clicking on label', () => {
            labelElement.click();
            fixture.detectChanges();

            expect(fixture.componentInstance.isSelected).toBeTrue();
            expect(inputElement.checked).toBeTrue();

            labelElement.click();
            fixture.detectChanges();

            expect(fixture.componentInstance.isSelected).toBeFalse();
            expect(inputElement.checked).toBeFalse();
        });

        it('should toggle disabled state', () => {
            fixture.componentInstance.disabled = false;
            fixture.detectChanges();
            expect(inputElement.disabled).toBeFalse();

            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(inputElement.disabled).toBeTrue();
        });
    });
});

@Component({
    template: `
        <checkbox
            [value]="isSelected"
            [undefinedState]="undefinedState"
            [disabled]="disabled"
            [loading]="loading"
            >Simple checkbox</checkbox
        >
    `,
    standalone: false
})
class SimpleCheckbox {
    isSelected = false;
    undefinedState = false;
    disabled = false;
    loading = false;
}

@Component({
    template: `
        <checkbox
            [formControl]="formControl"
            [undefinedState]="undefinedState"
        ></checkbox>
    `,
    standalone: false
})
class FormCheckbox {
    formControl = new UntypedFormControl(false);
    undefinedState = false;
    set isSelected(value: boolean) {
        this.formControl.patchValue(value);
    }

    get isSelected() {
        return this.formControl.value;
    }

    set disabled(value: boolean) {
        if (value) {
            this.formControl.disable();
        } else {
            this.formControl.enable();
        }
    }

    get disabled() {
        return this.formControl.disabled;
    }
}
