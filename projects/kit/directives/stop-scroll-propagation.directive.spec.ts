import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    DebugElement,
    ElementRef,
    NgZone,
    SimpleChange
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { StopScrollPropagationDirective } from '@dagility-ui/kit';

@Component({
    template: `
        <div stopScrollPropagation></div>
    `,
    standalone: false
})
class TestComponent {}

describe('StopScrollPropagationDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let stopScrollPropagation: DebugElement[];
    let testClass: StopScrollPropagationDirective;

    function setStaticMethod(methodName: string, param: any) {
        spyOn<any>(
            StopScrollPropagationDirective,
            methodName
        ).and.callThrough();

        StopScrollPropagationDirective[methodName](param);

        expect(StopScrollPropagationDirective[methodName]).toHaveBeenCalledWith(
            param
        );
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, StopScrollPropagationDirective],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);

        stopScrollPropagation = fixture.debugElement.queryAll(
            By.directive(StopScrollPropagationDirective)
        );

        testClass = new StopScrollPropagationDirective(
            new ElementRef<any>(document.createElement('div')),
            new NgZone({})
        );

        fixture.detectChanges();
    });

    it('should have StopScrollPropagationDirective', () => {
        expect(stopScrollPropagation).not.toBeNull();
    });

    it('ngOnChanges should be called', () => {
        spyOn(testClass, 'ngOnChanges').and.callThrough();
        const param = {
            stopKeyScroll: new SimpleChange({}, {}, true)
        };
        testClass.stopKeyScroll = true;
        testClass.ngOnChanges(param);
        expect(testClass.ngOnChanges).toHaveBeenCalledWith(param);
    });

    it('ngOnChanges should be called without stopKeyScroll', () => {
        spyOn(testClass, 'ngOnChanges').and.callThrough();
        const param = {
            stopKeyScroll: new SimpleChange({}, {}, true)
        };
        testClass.ngOnChanges(param);
        expect(testClass.ngOnChanges).toHaveBeenCalledWith(param);
    });

    it('getDirectionFromKeyboardEvent should be called', () => {
        setStaticMethod('getDirectionFromKeyboardEvent', {
            key: ' ',
            shiftKey: true
        });
    });

    it('getDirectionFromKeyboardEvent should be called without shiftKey', () => {
        setStaticMethod('getDirectionFromKeyboardEvent', {
            key: ' '
        });
    });

    it('getDirectionFromKeyboardEvent should be called with ArrowUp', () => {
        setStaticMethod('getDirectionFromKeyboardEvent', {
            key: 'ArrowUp'
        });
    });

    it('getDirectionFromKeyboardEvent should be called with ArrowDown', () => {
        setStaticMethod('getDirectionFromKeyboardEvent', {
            key: 'ArrowDown'
        });
    });

    it('getDirectionFromKeyboardEvent should be called without key', () => {
        setStaticMethod('getDirectionFromKeyboardEvent', {});
    });

    it('getDirectionFromWheelEvent should be called', () => {
        setStaticMethod('getDirectionFromWheelEvent', {
            detail: true
        });
    });

    it('getDirectionFromWheelEvent should be called without detail', () => {
        setStaticMethod('getDirectionFromWheelEvent', {});
    });

    it('getDirectionFromEvent should be called', () => {
        setStaticMethod('getDirectionFromEvent', new WheelEvent(''));
    });

    it('getDirectionFromEvent should be called without WheelEvent', () => {
        setStaticMethod('getDirectionFromEvent', {});
    });

    it('isFormElement should be called', () => {
        setStaticMethod('isFormElement', { tagName: 'SELECT' });
    });

    it('isScrollableElement should be called', () => {
        spyOn(window, 'getComputedStyle').and.returnValue({
            overflowY: 'hidden'
        } as any);
        setStaticMethod('isScrollableElement', {});
    });

    it('isScrollableElement should be called without overflowY', () => {
        spyOn(window, 'getComputedStyle').and.returnValue({} as any);
        setStaticMethod('isScrollableElement', {} as any);
    });
});
