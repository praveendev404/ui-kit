import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { VisibilityDirective } from '@dagility-ui/kit';

@Component({
    template: `
        <div (visibilityChanged)="changed($event)">1</div>
    `,
    standalone: false
})
class TestComponent {
    changed(visible: boolean) {}
}

const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

describe('VisibilityDirective', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, VisibilityDirective]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('should detect visibility changes', async () => {
        const component = fixture.componentInstance;
        const visibilityChanged = spyOn(component, 'changed').and.callThrough();
        fixture.elementRef.nativeElement.hidden = true;
        await waitFor(50);
        expect(visibilityChanged).toHaveBeenCalledWith(false);
        fixture.elementRef.nativeElement.hidden = false;
        await waitFor(50);
        expect(visibilityChanged).toHaveBeenCalledWith(true);
    });

});
