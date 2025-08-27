import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidenavComponent, SidenavContainerComponent } from '@dagility-ui/kit';
import {Component, ContentChild} from '@angular/core';

@Component({
    template: `<lib-sidenav-container>
        <lib-sidenav expanded="true" mode="push"></lib-sidenav>
    </lib-sidenav-container>`,
    standalone: false
})
class TestComponent {
    @ContentChild(SidenavComponent) sidenav: SidenavComponent;
}

describe('SidenavContainerComponent', () => {
    let component: TestComponent;
    let sideNavComponent: any;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavContainerComponent, SidenavComponent, TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        sideNavComponent = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('sideNav mode should be changed', () => {
        spyOn(sideNavComponent.sidenav, 'handlePinToggle').and.callThrough();
        sideNavComponent.sidenav.handlePinToggle();
        expect(sideNavComponent.sidenav.mode).toBe('over');
    });
});
