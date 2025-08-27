import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContextButtonDirective, ContextMenuComponent, ContextSpecialItemsDirective } from '@dagility-ui/kit';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<lib-context-menu class="context-menu">
        <ng-template buttonTemplate></ng-template>
        <ng-template specialItems></ng-template>
    </lib-context-menu>`,
    standalone: false
})
class TestComponent { }

describe('ContextMenuDirectives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let buttonTemplate: DebugElement[];
    let specialItems: DebugElement[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, ContextMenuComponent, ContextButtonDirective, ContextSpecialItemsDirective],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        buttonTemplate = fixture.debugElement.queryAll(By.directive(ContextButtonDirective));
        specialItems = fixture.debugElement.queryAll(By.directive(ContextSpecialItemsDirective));
    });

    it('should have buttonTemplate', () => {
        expect(buttonTemplate).not.toBeNull();
    });

    it('should have specialItems', () => {
        expect(specialItems).not.toBeNull();
    });
});
