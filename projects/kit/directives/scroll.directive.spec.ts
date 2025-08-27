import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    DebugElement,
    ElementRef
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { ScrollDirective } from '@dagility-ui/kit';
// import * as rxjs from 'rxjs';

@Component({
    template: `
        <div appScroll></div>
    `,
    standalone: false
})
class TestComponent {}

describe('ScrollDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let keepPosition: DebugElement[];
    let testClass: ScrollDirective;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, ScrollDirective],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);

        keepPosition = fixture.debugElement.queryAll(
            By.directive(ScrollDirective)
        );

        testClass = new ScrollDirective(
            new ElementRef<any>(document.createElement('div'))
        );

        fixture.detectChanges();
    });

    it('should have ScrollDirective', () => {
        expect(keepPosition).not.toBeNull();
    });

    it('get isOnBottom should return false', () => {
        testClass['_isOnBottom'] = false;
        expect(testClass.isOnBottom).toBeFalse();
    });

    it('set isOnBottom should set false', () => {
        testClass.isOnBottom = false;
        expect(testClass.isOnBottom).toBeFalse();
    });

    xit('ngAfterViewInit should be called (problem with rxjs.fromEvent)', () => {
        spyOn(testClass, 'ngAfterViewInit').and.callThrough();
        // spyOn<any>(rxjs, 'fromEvent').and.returnValue(rxjs.of([1, 2]) as any);

        testClass.ngAfterViewInit();
        expect(testClass.ngAfterViewInit).toHaveBeenCalled();
    });

    it('isScrollingDown should return true', () => {
        expect(
            testClass.isScrollingDown(
                {
                    scrollTop: 0
                },
                { scrollTop: 10 }
            )
        ).toBeTrue();
    });

    it('isScrollToTop should return true', () => {
        expect(
            testClass.isScrollToTop({
                scrollTop: 0
            })
        ).toBeTrue();
    });

    it('isScrollToBottom should return true', () => {
        expect(
            testClass.isScrollToBottom({
                scrollHeight: 10,
                scrollTop: 10,
                clientHeight: 0
            })
        ).toBeTrue();
    });

    it('isScrollingUp should return true', () => {
        expect(
            testClass.isScrollingUp({ scrollTop: 10 }, { scrollTop: 0 })
        ).toBeTrue();
    });
});
