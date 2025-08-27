import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ErrorMessageComponent } from '@dagility-ui/kit';

describe('ErrorMessageComponent', () => {
    let fixture: ComponentFixture<ErrorMessageComponent>;
    let component: ErrorMessageComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ErrorMessageComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).not.toBeNull();
    });

    it('message should be called', () => {
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
