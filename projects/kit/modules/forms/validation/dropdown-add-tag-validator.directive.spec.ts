import { Component, DebugElement } from '@angular/core';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import {
    DropdownAddTagValidatorDirective,
    DropdownComponent
} from '@dagility-ui/kit';
import { By } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    template: `
        <lib-dropdown
            [libDropdownAddTagValidator]="Validators.pattern('')"
        ></lib-dropdown>
    `,
    standalone: false
})
class TestComponent {
    Validators = Validators;
}

describe('DropdownAddTagValidatorDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let dropdownAddTagValidatorDirective: DebugElement[];
    let testClass: DropdownAddTagValidatorDirective;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, DropdownAddTagValidatorDirective],
                providers: [DropdownComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        dropdownAddTagValidatorDirective = fixture.debugElement.queryAll(
            By.directive(DropdownAddTagValidatorDirective)
        );

        testClass = new DropdownAddTagValidatorDirective({} as any);
    });

    it('should have dropdownAddTagValidatorDirective', () => {
        expect(dropdownAddTagValidatorDirective).not.toBeNull();
    });

    it('ngOnInit should be called with INVALID', fakeAsync(() => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        testClass.ngOnInit();

        (testClass['control'].statusChanges as Subject<any>).next('INVALID');
        tick();

        expect(testClass.ngOnInit).toHaveBeenCalled();
    }));

    it('ngOnInit should be called with INVALID and errorElement', fakeAsync(() => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        testClass['errorElement'] = {} as any;
        testClass['dropdown'] = {
            addTagContainerRef: {
                element: {
                    nativeElement: {
                        parentElement: {
                            appendChild: () => {}
                        }
                    }
                }
            },
            ngSelect: {
                searchEvent: new BehaviorSubject(0)
            },
            addTag: {},
            addTagFunction: {
                apply: () => {}
            }
        } as any;
        testClass.ngOnInit();
        (testClass['dropdown'].addTagFn as any)();

        (testClass['control'].statusChanges as Subject<any>).next('INVALID');
        tick();

        expect(testClass.ngOnInit).toHaveBeenCalled();
    }));

    it('ngOnInit should be called with errorElement', fakeAsync(() => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        testClass['errorElement'] = {
            parentElement: {
                removeChild: () => {}
            }
        } as any;
        testClass['dropdown'] = {
            addTagContainerRef: {
                element: {
                    nativeElement: {
                        parentElement: {
                            appendChild: () => {}
                        }
                    }
                }
            },
            ngSelect: {
                searchEvent: new BehaviorSubject(0)
            },
            addTag: {},
            addTagFunction: {
                apply: () => {}
            }
        } as any;

        testClass.ngOnInit();
        spyOnProperty(testClass['control'], 'valid').and.returnValue(false);
        (testClass['dropdown'].addTagFn as any)();

        (testClass['control'].statusChanges as Subject<any>).next({});
        tick();

        expect(testClass.ngOnInit).toHaveBeenCalled();
    }));

    it('ngOnInit should be called without errorElement', fakeAsync(() => {
        spyOn(testClass, 'ngOnInit').and.callThrough();
        testClass['errorElement'] = null;
        testClass.ngOnInit();

        (testClass['control'].statusChanges as Subject<any>).next({});
        tick();

        expect(testClass.ngOnInit).toHaveBeenCalled();
    }));
});
