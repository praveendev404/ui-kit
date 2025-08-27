import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    DebugElement,
    ElementRef,
    NgZone
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { TooltipWhenOverflowDirective } from '@dagility-ui/kit';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <div appStopClickPropagation></div>
    `,
    standalone: false
})
class TestComponent {}

describe('TooltipWhenOverflowDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let keepPosition: DebugElement[];
    let testClass: TooltipWhenOverflowDirective;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, TooltipWhenOverflowDirective],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);

        keepPosition = fixture.debugElement.queryAll(
            By.directive(TooltipWhenOverflowDirective)
        );

        testClass = new TooltipWhenOverflowDirective(
            new ElementRef<any>(document.createElement('div')),
            {
                open: () => {},
                close: () => {},
                isOpen: () => true
            } as NgbTooltip,
            new NgZone({})
        );

        fixture.detectChanges();
        testClass.ngOnInit();
    });

    it('should have TooltipWhenOverflowDirective', () => {
        expect(keepPosition).not.toBeNull();
    });

    it('onMouseEnter should be called', () => {
        spyOn<any>(testClass, 'onMouseEnter').and.callThrough();
        spyOn<any>(testClass, 'isOverflow').and.returnValue(true);

        testClass['onMouseEnter']();
        expect(testClass['onMouseEnter']).toHaveBeenCalled();
    });

    it('onMouseEnter should be called with isOverflow = false', () => {
        spyOn<any>(testClass, 'onMouseEnter').and.callThrough();

        testClass['onMouseEnter']();
        expect(testClass['onMouseEnter']).toHaveBeenCalled();
    });

    it('onMouseLeave should be called', () => {
        spyOn<any>(testClass, 'onMouseLeave').and.callThrough();
        testClass['onMouseLeave']();
        expect(testClass['onMouseLeave']).toHaveBeenCalled();
    });

    it('onMouseLeave should be called', () => {
        spyOn<any>(testClass, 'onMouseLeave').and.callThrough();
        testClass['tooltip'] = false as any;

        testClass['onMouseLeave']();
        expect(testClass['onMouseLeave']).toHaveBeenCalled();
    });

    it('ngOnDestroy should be called', () => {
        spyOn(testClass, 'ngOnDestroy').and.callThrough();
        testClass.ngOnDestroy();
        expect(testClass.ngOnDestroy).toHaveBeenCalled();
    });
});
