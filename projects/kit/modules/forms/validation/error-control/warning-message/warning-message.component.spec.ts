import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WarningMessageComponent } from '@dagility-ui/kit';

describe('WarningMessageComponent', () => {
    let fixture: ComponentFixture<WarningMessageComponent>;
    let component: WarningMessageComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [WarningMessageComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(WarningMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).not.toBeNull();
    });

    it('message should be called', () => {
        component.message = 'someValue';
        const spy = spyOnProperty(
            component,
            'message',
            'set'
        ).and.callThrough();
        component.message = 'someValue';

        expect(spy).toHaveBeenCalled();
    });

    it('message should be called with cdr.destroyed', () => {
        const spy = spyOnProperty(
            component,
            'message',
            'set'
        ).and.callThrough();
        spyOnProperty<any>(component['cdr'], 'destroyed').and.returnValue(true);

        component.message = 'someValue';
        expect(spy).toHaveBeenCalled();
    });
});
