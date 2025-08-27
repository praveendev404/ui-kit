import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidenavComponent, SidenavItem } from '@dagility-ui/kit';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('handleExpand method should be called and toggle expanded value', () => {
        spyOn(component, 'handleExpand').and.callThrough();
        component.handleExpand(true);
        expect(component.expanded).toBeTruthy();
        component.handleExpand(false);
        expect(component.expanded).toBeFalse();
    });

    it('isSidenavItem method should be called', () => {
        const item = {routerLink: 'test'} as SidenavItem;
        spyOn(component, 'isSidenavItem').and.callThrough();
        const result = component.isSidenavItem(item);
        expect(result).toBe(item);
    });

    it('handlePinToggle method should be called', () => {
        spyOn(component, 'handlePinToggle').and.callThrough();
        component.handlePinToggle();
        expect(component.handlePinToggle).toHaveBeenCalled();
    });
});
