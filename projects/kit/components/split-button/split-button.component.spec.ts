import { SplitButtonComponent } from '@dagility-ui/kit';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('SplitButtonComponent', () => {
    let component: SplitButtonComponent<any>;
    let fixture: ComponentFixture<SplitButtonComponent<any>>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SplitButtonComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SplitButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('SplitButtonComponent should be created', () => {
        expect(component).toBeTruthy();
    });
});
