import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidenavFooterDirective, SidenavHeaderDirective } from '@dagility-ui/kit';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<ng-container>
        <ng-template libSidenavHeader></ng-template>
        <ng-template libSidenavFooter></ng-template>
    </ng-container>`,
    standalone: false
})
class TestComponent { }

describe('SidenavDirectives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let sidenavHeader: DebugElement[];
    let sidenavFooter: DebugElement[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, SidenavHeaderDirective, SidenavFooterDirective],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        sidenavHeader = fixture.debugElement.queryAll(By.directive(SidenavHeaderDirective));
        sidenavFooter = fixture.debugElement.queryAll(By.directive(SidenavFooterDirective));
    });

    it('should have headerTemplate', () => {
        expect(sidenavHeader).not.toBeNull();
    });

    it('should have footerTemplate', () => {
        expect(sidenavFooter).not.toBeNull();
    });
});
