import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    DebugElement,
    ElementRef
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { StopClickPropagationDirective } from '@dagility-ui/kit';

@Component({
    template: `
        <div appStopClickPropagation></div>
    `,
    standalone: false
})
class TestComponent {}

describe('StopClickPropagationDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let keepPosition: DebugElement[];
    let testClass: StopClickPropagationDirective;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, StopClickPropagationDirective],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);

        keepPosition = fixture.debugElement.queryAll(
            By.directive(StopClickPropagationDirective)
        );

        testClass = new StopClickPropagationDirective(
            new ElementRef<any>(document.createElement('div'))
        );

        fixture.detectChanges();
    });

    it('should have StopClickPropagationDirective', () => {
        expect(keepPosition).not.toBeNull();
    });

    it('ngOnInit should be called', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        testClass.ngOnInit();
        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('clickHandler should call click emit', () => {
        const param = { stopPropagation: () => {} } as Event;
        spyOn(testClass.click, 'emit').and.callThrough();
        testClass.clickHandler(param);

        expect(testClass.click.emit).toHaveBeenCalledWith(param);
    });

    it('ngOnDestroy should be called', () => {
        spyOn(testClass, 'ngOnDestroy').and.callThrough();
        testClass.ngOnDestroy();
        expect(testClass.ngOnDestroy).toHaveBeenCalled();
    });
});
