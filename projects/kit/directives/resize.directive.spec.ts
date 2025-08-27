import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    DebugElement,
    ElementRef
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { ResizeDirective } from '@dagility-ui/kit';

@Component({
    template: `
        <div libResize></div>
    `,
    standalone: false
})
class TestComponent {}

describe('ResizeDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let keepPosition: DebugElement[];
    let testClass: ResizeDirective;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, ResizeDirective],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);

        keepPosition = fixture.debugElement.queryAll(
            By.directive(ResizeDirective)
        );

        testClass = new ResizeDirective(
            new ElementRef<any>(document.createElement('div'))
        );

        testClass.parentItem = { style: {}, offsetHeight: 0 };

        fixture.detectChanges();
    });

    it('should have ResizeDirective', () => {
        expect(keepPosition).not.toBeNull();
    });

    it('onMouseUp should call destroy$ next', () => {
        spyOn(testClass['destroy$'], 'next').and.callThrough();
        testClass.onMouseUp();

        expect(testClass.grabber).toBeFalse();
        expect(testClass['destroy$'].next).toHaveBeenCalled();
    });

    it('ngOnInit should be called', () => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        testClass.ngOnInit();

        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('ngOnInit should be called with defaultHeight', () => {
        testClass.defaultHeight = 42;
        testClass.ngOnInit();

        expect(testClass.height).toBe(42);
    });

    it('onResize should call addMouseMoveListener', () => {
        spyOn(testClass, 'addMouseMoveListener').and.callThrough();
        testClass.onResize({ clientY: 0, preventDefault: () => {} } as any);

        expect(testClass.grabber).toBeTrue();
        expect(testClass.addMouseMoveListener).toHaveBeenCalled();
    });

    it('addMouseMoveListener should be called', () => {
        spyOn(testClass, 'addMouseMoveListener').and.callThrough();
        testClass.addMouseMoveListener();
        expect(testClass.addMouseMoveListener).toHaveBeenCalled();
    });

    it('addMouseMoveListener should be called', () => {
        spyOn(testClass, 'addMouseMoveListener').and.callThrough();
        testClass.addMouseMoveListener();
        expect(testClass.addMouseMoveListener).toHaveBeenCalled();
    });

    it('mouseMoveCallback should be called', () => {
        spyOn(testClass, 'mouseMoveCallback').and.callThrough();
        const param = {} as any;

        testClass.mouseMoveCallback(param);
        expect(testClass.mouseMoveCallback).toHaveBeenCalledWith(param);
    });

    it('mouseMoveCallback should assign oldY to event.clientY', () => {
        spyOn(testClass, 'mouseMoveCallback').and.callThrough();
        testClass.grabber = true;
        const param = { clientY: 0 } as any;

        testClass.mouseMoveCallback(param);
        expect(testClass.oldY).toBe(0);
    });
});
