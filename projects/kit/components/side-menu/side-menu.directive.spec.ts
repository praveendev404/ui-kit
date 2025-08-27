import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    SideMenuChildItemDirective,
    SideMenuFooterDirective,
    SideMenuHeaderDirective,
    SideMenuItemDirective
} from '@dagility-ui/kit';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <lib-side-menu>
            <ng-template sideMenuHeaderTemplate></ng-template>
            <ng-template sideMenuItemTemplate></ng-template>
            <ng-template sideMenuChildItemTemplate></ng-template>
            <ng-template sideMenuFooterTemplate></ng-template>
        </lib-side-menu>
    `,
    standalone: false
})
class TestComponent {}

describe('SideMenu Directives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let sideMenuHeaderTemplate: DebugElement[];
    let sideMenuItemTemplate: DebugElement[];
    let sideMenuChildItemTemplate: DebugElement[];
    let sideMenuFooterTemplate: DebugElement[];

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestComponent,
                    SideMenuHeaderDirective,
                    SideMenuItemDirective,
                    SideMenuChildItemDirective,
                    SideMenuFooterDirective
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        sideMenuHeaderTemplate = fixture.debugElement.queryAll(
            By.directive(SideMenuHeaderDirective)
        );
        sideMenuItemTemplate = fixture.debugElement.queryAll(
            By.directive(SideMenuItemDirective)
        );
        sideMenuChildItemTemplate = fixture.debugElement.queryAll(
            By.directive(SideMenuChildItemDirective)
        );
        sideMenuFooterTemplate = fixture.debugElement.queryAll(
            By.directive(SideMenuFooterDirective)
        );
    });

    it('should have sideMenuHeaderTemplate', () => {
        expect(sideMenuHeaderTemplate).not.toBeNull();
    });

    it('should have sideMenuItemTemplate', () => {
        expect(sideMenuItemTemplate).not.toBeNull();
    });

    it('should have sideMenuChildItemTemplate', () => {
        expect(sideMenuChildItemTemplate).not.toBeNull();
    });

    it('should have sideMenuFooterTemplate', () => {
        expect(sideMenuFooterTemplate).not.toBeNull();
    });
});
