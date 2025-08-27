import { SideMenuComponent } from '@dagility-ui/kit';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { Subject } from 'rxjs';

describe('SideMenuComponent', () => {
    let component: SideMenuComponent;
    let fixture: ComponentFixture<SideMenuComponent>;

    function setupOnResize() {
        const val = [
            {
                children: []
            }
        ] as any;
        val.item = () => {
            return { classList: { add: () => {}, remove: () => {} } };
        };

        spyOn(component, 'onResize').and.callThrough();
        spyOn(document, 'getElementsByClassName').and.returnValue(val);
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SideMenuComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('SideMenuComponent should be created', () => {
        expect(component).toBeTruthy();
    });

    it('ngAfterViewInit should be called', fakeAsync(() => {
        spyOn(component, 'ngAfterViewInit').and.callThrough();
        spyOn(document, 'getElementsByClassName').and.returnValue([
            { children: [] }
        ] as any);
        component.ngAfterViewInit();
        tick();
        expect(component.ngAfterViewInit).toHaveBeenCalled();
    }));

    it('onResize should be called', () => {
        setupOnResize();
        component.onResize();
        expect(component.onResize).toHaveBeenCalled();
    });

    it('onResize should be called another condition', () => {
        spyOnProperty(window, 'innerWidth', 'get').and.returnValue(999);
        setupOnResize();
        component.onResize();
        expect(component.onResize).toHaveBeenCalled();
    });

    it('handleClick should be called', () => {
        spyOn(component, 'handleClick').and.callThrough();

        const menuItem = {},
            menuClicked = new Subject(),
            event = new Event('event');
        component.handleClick(menuItem, menuClicked, event);

        expect(component.handleClick).toHaveBeenCalledWith(
            menuItem,
            menuClicked,
            event
        );
    });

    it('search should be called', () => {
        spyOn(component, 'search').and.callThrough();
        component.menuItems = [
            {
                title: 'someValue',
                children: [{ title: 'someValue', routerLink: 'someLink' }],
                opened: false,
                routerLink: 'someLink'
            },
            {
                title: 'anotherValue',
                children: [
                    { title: 'anotherValue', routerLink: 'anotherLink' }
                ],
                opened: false,
                routerLink: 'anotherLink'
            }
        ];
        component.search('someValue');
        expect(component.search).toHaveBeenCalledWith('someValue');
    });

    it('search should be called without children', () => {
        spyOn(component, 'search').and.callThrough();
        component.menuItems = [
            {
                title: 'someValue',
                opened: false,
                routerLink: 'someLink'
            }
        ];
        component.search('someValue');
        expect(component.search).toHaveBeenCalledWith('someValue');
    });

    it('handleOverlay should be returned in 1st condition', () => {
        spyOn(component, 'handleOverlay').and.callThrough();
        spyOnProperty(window, 'innerWidth').and.returnValue(1001);
        component.handleOverlay(true);
        expect(component.handleOverlay).toHaveBeenCalledWith(true);
    });

    it('handleOverlay should be called with true', () => {
        spyOn(component, 'handleOverlay').and.callThrough();
        spyOnProperty(window, 'innerWidth').and.returnValue(0);
        component.handleOverlay(true);
        expect(component.handleOverlay).toHaveBeenCalledWith(true);
    });

    it('handleOverlay should be called with false', () => {
        spyOn(component, 'handleOverlay').and.callThrough();
        spyOnProperty(window, 'innerWidth').and.returnValue(0);
        component.handleOverlay(false);
        expect(component.handleOverlay).toHaveBeenCalledWith(false);
    });
});
