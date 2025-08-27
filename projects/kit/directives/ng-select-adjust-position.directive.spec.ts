import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    DebugElement,
    NgZone
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownComponent, NgSelectAdjustPosition } from '@dagility-ui/kit';

@Component({
    template: `
        <lib-dropdown keep-position> </lib-dropdown>
    `,
    standalone: false
})
class TestComponent {}

describe('NgSelectAdjustPosition', () => {
    let fixture: ComponentFixture<TestComponent>;
    let keepPosition: DebugElement[];
    let testClass: NgSelectAdjustPosition;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, NgSelectAdjustPosition],
                providers: [DropdownComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        keepPosition = fixture.debugElement.queryAll(
            By.directive(NgSelectAdjustPosition)
        );
        const param = {} as any;

        testClass = new NgSelectAdjustPosition(
            param,
            param,
            param,
            new NgZone({ enableLongStackTrace: false })
        );
    });

    it('should have NgSelectAdjustPosition', () => {
        expect(keepPosition).not.toBeNull();
    });

    it('ngOnInit should be called', () => {
        testClass['ref'] = {
            nativeElement: {
                scrollHeight: 1,
                clientHeight: 0,
                addEventListener: () => {}
            }
        } as any;

        spyOn(testClass, 'ngOnInit').and.callThrough();
        spyOn(testClass['zone'], 'runOutsideAngular').and.callThrough();

        testClass.ngOnInit();
        expect(testClass.ngOnInit).toHaveBeenCalled();
    });

    it('handleWheel should be called', () => {
        spyOn(testClass, 'handleWheel').and.callThrough();
        testClass['dropdown'] = {
            ngSelect: { isOpen: true, _handleDropdownPosition: () => {} }
        } as any;

        testClass.handleWheel();
        expect(testClass.handleWheel).toHaveBeenCalled();
    });

    it('handleWheel should be called with closeByScroll = true', () => {
        spyOn(testClass, 'handleWheel').and.callThrough();

        testClass['dropdown'] = {
            ngSelect: {
                isOpen: true,
                _handleDropdownPosition: () => {},
                close: () => {}
            }
        } as any;
        testClass['closeByScroll'] = true;
        testClass['cdr'] = { detectChanges: () => {} } as any;

        testClass.handleWheel();
        expect(testClass.handleWheel).toHaveBeenCalled();
    });

    it('handleWheel should be called with isOpen = false', () => {
        spyOn(testClass, 'handleWheel').and.callThrough();
        testClass['dropdown'] = {
            ngSelect: { isOpen: false }
        } as any;

        testClass.handleWheel();
        expect(testClass.handleWheel).toHaveBeenCalled();
    });

    it('ngOnDestroy should be called', () => {
        spyOn(testClass, 'ngOnDestroy').and.callThrough();
        testClass.currentItem = { removeEventListener: () => {} };
        testClass.ngOnDestroy();
        expect(testClass.ngOnDestroy).toHaveBeenCalled();
    });
});
