import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TriggerComponent } from './trigger.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TriggerComponent', () => {
    let component: TriggerComponent;
    let fixture: ComponentFixture<TriggerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TriggerComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TriggerComponent);
        component = fixture.componentInstance;
        component.warningMessage = 'test';
        fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('registerOnChange method should be called', () => {
        const fn = new Function();
        spyOn(component, 'registerOnChange').and.callThrough();
        component.registerOnChange(fn);
        expect(component.registerOnChange).toHaveBeenCalledWith(fn);
    });

    it('registerOnTouched method should be called', () => {
        const fn = new Function();
        spyOn(component, 'registerOnTouched').and.callThrough();
        component.registerOnTouched(fn);
        expect(component.registerOnTouched).toHaveBeenCalledWith(fn);
    });

    it('setDisabledState method should be called', () => {
        spyOn(component, 'setDisabledState').and.callThrough();
        component.setDisabledState(true);
        expect(component.setDisabledState).toHaveBeenCalledWith(true);
    });

    it('writeValue method should be called', () => {
        spyOn(component, 'writeValue').and.callThrough();
        component.writeValue(true);
        expect(component.writeValue).toHaveBeenCalledWith(true);
    });

    it('onCheck method should be called', () => {
        const fn = new Function();
        spyOn(component, 'onCheck').and.callThrough();
        component.registerOnChange(fn);
        component.registerOnTouched(fn);
        component.onCheck();
        expect(component.onCheck).toHaveBeenCalled();
    });

    it('warning property should be defined', () => {
        expect(component.warning).toBe('test');
    });

    it('warning property should be defined', () => {
        expect(component.warning).toBe('test');
    });
});
