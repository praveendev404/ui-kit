import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { NavbarMenuComponent } from '@dagility-ui/kit';
import { of } from 'rxjs';

describe('NavbarMenuComponent', () => {
    let component: NavbarMenuComponent;
    let fixture: ComponentFixture<NavbarMenuComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [NavbarMenuComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngAfterViewInit should be called', fakeAsync(() => {
        spyOn(component, 'ngAfterViewInit').and.callThrough();
        component.menuItems$ = of([1, 2, 3] as any);
        component.ngAfterViewInit();
        tick(1000);

        expect(component.ngAfterViewInit).toHaveBeenCalled();
    }));

    it('ngOnChanges should be called', fakeAsync(() => {
        spyOn(component, 'ngOnChanges').and.callThrough();
        component.ngOnChanges();
        tick(1000);

        expect(component.ngOnChanges).toHaveBeenCalled();
    }));

    it('onResize should be called', () => {
        spyOn(component, 'onResize').and.callThrough();
        component.onResize();
        expect(component.onResize).toHaveBeenCalled();
    });

    it('checkCollapse should be called with collapsed', () => {
        spyOn(component, 'checkCollapse').and.callThrough();
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(10);

        (component as any).elRef = {
            nativeElement: {
                getElementsByClassName: () => ({
                    item: () => ({
                        style: {},
                        getBoundingClientRect: () => 200
                    })
                })
            }
        };
        component.collapsed = true;
        component.checkCollapse();

        expect(component.checkCollapse).toHaveBeenCalled();
    });

    it('checkCollapse should be called with collapsed without nativeElement', () => {
        spyOn(component, 'checkCollapse').and.callThrough();
        (component as any).elRef = {};
        component.collapsed = true;
        component.checkCollapse();

        expect(component.checkCollapse).toHaveBeenCalled();
    });

    it('checkCollapse should be called with collapsed without children', () => {
        spyOn(component, 'checkCollapse').and.callThrough();
        (component as any).elRef = {
            nativeElement: {
                getElementsByClassName: () => {}
            }
        };
        component.collapsed = true;
        component.checkCollapse();

        expect(component.checkCollapse).toHaveBeenCalled();
    });

    it('checkCollapse should be called without collapsed', () => {
        spyOn(component, 'checkCollapse').and.callThrough();
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(400);

        (component as any).elRef = {
            nativeElement: {
                getElementsByClassName: () => ({
                    item: () => ({
                        style: {},
                        getBoundingClientRect: () => 10
                    })
                })
            }
        };
        component.checkCollapse();

        expect(component.checkCollapse).toHaveBeenCalled();
    });

    it('checkCollapse should be called without collapsed and nativeElement', () => {
        spyOn(component, 'checkCollapse').and.callThrough();

        (component as any).elRef = {};
        component.checkCollapse();

        expect(component.checkCollapse).toHaveBeenCalled();
    });

    it('checkCollapse should be called without collapsed and children', () => {
        spyOn(component, 'checkCollapse').and.callThrough();

        (component as any).elRef = {
            nativeElement: {
                getElementsByClassName: () => {}
            }
        };
        component.checkCollapse();

        expect(component.checkCollapse).toHaveBeenCalled();
    });

    it('checkCollapse should be called without navBar', () => {
        spyOn(component, 'checkCollapse').and.callThrough();
        component.checkCollapse();
        expect(component.checkCollapse).toHaveBeenCalled();
    });

    it('ngOnDestroy should be called', () => {
        spyOn(component, 'ngOnDestroy').and.callThrough();
        component.ngOnDestroy();
        expect(component.ngOnDestroy).toHaveBeenCalled();
    });
});
