import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';
import { By } from '@angular/platform-browser';
import { ErrorControlDirective, FormSubmitDirective } from '@dagility-ui/kit';
import { UntypedFormControl, NgControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { PerfectScrollbarModule } from 'perfect-scrollbar-angular';

describe('TextareaComponent', () => {
    let component: TextareaComponent;
    let fixture: ComponentFixture<TextareaComponent>;
    const formSubmit$: Subject<any> = new Subject();

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TextareaComponent],
                imports: [PerfectScrollbarModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareaComponent);
        component = fixture.componentInstance;
        component.setDisable = true;
        component.ngControl = {
            control: { statusChanges: of(true) }
        } as unknown as NgControl;
        component['form'] = {
            submit$: formSubmit$ as Observable<any>
        } as FormSubmitDirective;
        component['cdr'] = { markForCheck: () => {} } as ChangeDetectorRef;
        fixture.detectChanges();
    });

    it('handleInput method should be called', () => {
        const value = 'test';
        spyOn(component, 'handleInput').and.callThrough();
        spyOn(component, 'onChange');
        component.handleInput(value);
        expect(component.onChange).toHaveBeenCalledWith(value);
    });

    it('copyToClipboard method should be called', () => {
        const inputElement = fixture.debugElement.query(By.css('textarea'))
            .nativeElement;
        spyOn(component, 'copyToClipboard').and.callThrough();
        component.copyToClipboard(inputElement);
        expect(component.copyToClipboard).toHaveBeenCalledWith(inputElement);
    });

    it('writeValue method should be called', () => {
        const inputElement = fixture.debugElement.query(By.css('textarea'))
            .nativeElement;
        spyOn(component, 'writeValue').and.callThrough();
        component.writeValue(inputElement);
        expect(component.writeValue).toHaveBeenCalledWith(inputElement);
    });

    it('registerOnChange method should be called', () => {
        const fn = new Function();
        spyOn(component, 'registerOnChange').and.callThrough();
        component.registerOnChange(fn);
        expect(component.onChange).toBe(fn);
    });

    it('registerOnTouched method should be called', () => {
        const fn = new Function();
        spyOn(component, 'registerOnTouched').and.callThrough();
        component.registerOnTouched(fn);
        expect(component.onTouched).toBe(fn);
    });

    it('hasErrors should return value', () => {
        component['errorControlDirective'] = {
            hasErrors: true
        } as ErrorControlDirective;
        expect(component.hasErrors).toBe(true);
    });

    it('control should be defined', () => {
        expect(component.control).toBe(
            component.ngControl.control as UntypedFormControl
        );
        component.ngControl = null;
        expect(component.control).not.toBeNull();
    });

    it('markForCheck should return value', () => {
        spyOn(component['cdr'], 'markForCheck');
        formSubmit$.next();
        expect(component['cdr'].markForCheck).toHaveBeenCalled();
    });

    it('if cross button is clicked then textarea value is an empty string', () => {
        const onChangeSpy = spyOn(component, 'onChange');
        component.readonly = false;
        component.value = 'some value';
        fixture.detectChanges();

        const crossButton = fixture.debugElement.query(By.css('.clear-btn'));
        crossButton.triggerEventHandler('click', null);

        expect(component.value).toBe('');
        expect(onChangeSpy).toHaveBeenCalledWith('');
    });

    it('clear-btn should be visible only if there is a value inside textarea', () => {
        let crossButton = fixture.debugElement.query(By.css('.clear-btn'));
        expect(crossButton).toBeNull();

        component.readonly = false;
        component.value = 'some value';
        fixture.detectChanges();

        crossButton = fixture.debugElement.query(By.css('.clear-btn'));
        expect(crossButton).not.toBeNull();
    })
});
