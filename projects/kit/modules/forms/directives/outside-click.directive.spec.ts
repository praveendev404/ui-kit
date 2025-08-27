import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { OutsideClickDirective } from '@dagility-ui/kit';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <div libOutsideClick></div>
    `,
    standalone: false
})
class TestComponent {}

describe('OutsideClickDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let outsideClickDirective: DebugElement[];
    let testClass: OutsideClickDirective;
    let containsSpyOn;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, OutsideClickDirective]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        outsideClickDirective = fixture.debugElement.queryAll(
            By.directive(OutsideClickDirective)
        );

        testClass = new OutsideClickDirective(
            new ElementRef(document.createElement('div'))
        );

        containsSpyOn = spyOn(
            testClass['elementRef'].nativeElement,
            'contains'
        );

        spyOn(testClass, 'onClick').and.callThrough();
        spyOn(document, 'getElementsByClassName').and.returnValue([
            {
                parentNode: { removeChild: () => {} }
            },
            {
                parentNode: { removeChild: () => {} }
            }
        ] as any);
        testClass.disabled = false;
    });

    it('should have outsideClickDirective', () => {
        expect(outsideClickDirective).not.toBeNull();
    });

    it('disabled should return false', () => {
        testClass['disabledValue'] = false;
        expect(testClass.disabled).toBeFalse();
    });

    it('disabled should be assign to true', () => {
        testClass.disabled = true;
        expect(testClass.disabled).toBeTrue();
    });

    it('onClick should be called', () => {
        testClass.onClick({
            target: {
                offsetWidth: 1,
                closest: () => {}
            },
            offsetX: 1,
        });

        expect(testClass.onClick).toHaveBeenCalled();
    });

    it('onClick should be called without target', () => {
        testClass.onClick({});
        expect(testClass.onClick).toHaveBeenCalled();
    });

    it('onClick should be called with disabled', () => {
        testClass.disabled = true;
        testClass.onClick({});
        expect(testClass.onClick).toHaveBeenCalled();
    });

    it('onClick should be called without context-help', () => {
        containsSpyOn.and.returnValue(false);

        testClass.onClick({
            target: {
                offsetWidth: 100,
                closest: () => {}
            },
            offsetX: 1
        });

        expect(testClass.onClick).toHaveBeenCalled();
    });

    it('onClick should be called with context-help', () => {
        containsSpyOn.and.returnValue(true);
        testClass.onClick({
            target: {
                offsetWidth: 100,
                closest: () => true
            },
            offsetX: 1
        });

        expect(testClass.onClick).toHaveBeenCalled();
    });
});
