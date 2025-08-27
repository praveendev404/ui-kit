import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavbarMenuSpecialItemsDirective } from '@dagility-ui/kit';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <lib-navbar-menu>
            <ng-template navbarSpecialItem></ng-template>
        </lib-navbar-menu>
    `,
    standalone: false
})
class TestComponent {}

describe('NavbarMenu Directive', () => {
    let fixture: ComponentFixture<TestComponent>;
    let navbarSpecialItem: DebugElement[];

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, NavbarMenuSpecialItemsDirective],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        navbarSpecialItem = fixture.debugElement.queryAll(
            By.directive(NavbarMenuSpecialItemsDirective)
        );
    });

    it('should have navbarSpecialItem', () => {
        expect(navbarSpecialItem).not.toBeNull();
    });
});
