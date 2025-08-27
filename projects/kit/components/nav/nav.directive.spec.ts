import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavItemDirective } from '@dagility-ui/kit';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <lib-nav>
            <ng-template navItem></ng-template>
        </lib-nav>
    `,
    standalone: false
})
class TestComponent {}

describe('NavDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let navItem: DebugElement[];

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, NavItemDirective],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        navItem = fixture.debugElement.queryAll(By.directive(NavItemDirective));
    });

    it('should have navItem', () => {
        expect(navItem).not.toBeNull();
    });
});
