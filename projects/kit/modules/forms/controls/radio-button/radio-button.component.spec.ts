import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadioButtonComponent } from '@dagility-ui/kit';
import { LibFormsModule } from '@dagility-ui/kit';

describe('RadioButtonComponent', () => {
    let component: RadioButtonComponent;
    let fixture: ComponentFixture<RadioButtonComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [LibFormsModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('disabled should be called', () => {
        spyOn(component, 'setDisabledState').and.callThrough();
        component.disabled = true;
        expect(component.setDisabledState).toHaveBeenCalledWith(true);
    });

    it('handleChange should be returned because disabledState = true', () => {
        spyOn(component, 'handleChange').and.callThrough();
        component.disabledState = true;
        component.handleChange();
        expect(component.handleChange).toHaveBeenCalled();
    });

    it('handleChange should be returned because preventDefault = true', () => {
        spyOn(component, 'handleChange').and.callThrough();
        component.preventDefault = true;
        component.handleChange();
        expect(component.handleChange).toHaveBeenCalled();
    });

    it('handleChange should be emit with value true', () => {
        component.value = true;

        spyOn(component.change, 'emit').and.callThrough();
        spyOn(component, 'handleChange').and.callThrough();

        component.handleChange();
        expect(component.change.emit).toHaveBeenCalled();
    });

    it('writeValue method should be called', () => {
        spyOn(component, 'writeValue').and.callThrough();
        component.writeValue({});
        expect(component.writeValue).toHaveBeenCalledWith({});
    });

    it('setDisabledState method should be called', () => {
        spyOn(component, 'setDisabledState').and.callThrough();
        component.setDisabledState(true);
        expect(component.setDisabledState).toHaveBeenCalledWith(true);
    });
});
