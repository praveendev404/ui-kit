import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputComponent } from '@dagility-ui/kit';
import { ElementRef } from '@angular/core';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [InputComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnChanges method should be called', () => {
        spyOn(component, 'ngOnChanges').and.callThrough();
        component.input = new ElementRef<HTMLInputElement>(
            document.createElement('input')
        );
        const simpleChange = {
            type: {
                previousValue: 0,
                currentValue: 0,
                firstChange: false,
                isFirstChange: () => true
            }
        };
        component.ngOnChanges(simpleChange);
        expect(component.ngOnChanges).toHaveBeenCalledWith(simpleChange);
    });

    it('cssClass shout return value for left position', () => {
        component.labelPosition = 'left';
        const res = component.cssClass;

        expect(res).toBe('lib-input d-flex flex-row lib-input--left');
    });

    it('ngOnChanges method should be called without input', () => {
        spyOn(component, 'ngOnChanges').and.callThrough();
        component.input = undefined;

        component.ngOnChanges({});
        expect(component.ngOnChanges).toHaveBeenCalledWith({});
    });

    it('handleInput method should call controlValueChange emit', () => {
        spyOn(component.controlValueChange, 'emit').and.callThrough();
        const event = { target: { value: true } };
        component.handleInput(event);
        expect(component.controlValueChange.emit).toHaveBeenCalledWith(event);
    });

    it('toggleReadonly method should be called with lockByFocus true', () => {
        spyOn(component, 'toggleReadonly').and.callThrough();
        component.lockByFocus = true;
        component.toggleReadonly(true);
        expect(component.toggleReadonly).toHaveBeenCalledWith(true);
    });

    it('setDisabledState method should be called', () => {
        spyOn(component, 'setDisabledState').and.callThrough();
        component.setDisable = true;
        expect(component.setDisabledState).toHaveBeenCalledWith(true);
    });

    it('copyToClipboard method should be called', () => {
        spyOn(component, 'copyToClipboard').and.callThrough();
        const inputEl = document.createElement('input');
        component.copyToClipboard(inputEl);
        expect(component.copyToClipboard).toHaveBeenCalledWith(inputEl);
    });
});
