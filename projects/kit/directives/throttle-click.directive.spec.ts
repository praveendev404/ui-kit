import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThrottledClickDirective } from './throttle-click.directive';

@Component({
    template: `
        <button (throttledClick)="counter = counter + 1" data-test-id="btn">Button</button>
    `,
    standalone: false
})
class TestComponent {
    counter = 1;
}

describe('ThrottledClickDirective', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent, ThrottledClickDirective]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('should click only once', fakeAsync(() => {
        const btn = fixture.debugElement.query(
            By.css(`[data-test-id="btn"]`)
        );
        btn.nativeElement.click();
        btn.nativeElement.click();
        btn.nativeElement.click();
        expect(fixture.componentInstance.counter).toBe(2);
        tick(500);
        expect(fixture.componentInstance.counter).toBe(2);
        btn.nativeElement.click();
        btn.nativeElement.click();
        btn.nativeElement.click();
        tick(500);
        expect(fixture.componentInstance.counter).toBe(3);
    }));

});
