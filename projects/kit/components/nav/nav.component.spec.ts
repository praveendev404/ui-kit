import { NavComponent, NavItemDirective } from '@dagility-ui/kit';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    Directive,
    Input
} from '@angular/core';
import { NgbModule, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('NavComponent', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NgbModule],
                declarations: [
                    NavComponent,
                    HostComponent,
                    NavItemDirective,
                    LibScrollerDisabledDir
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    describe('Common Scenarios', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(NavComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('NavComponent should be create', () => {
            expect(component).toBeTruthy();
        });

        it('ngAfterViewChecked should be called', () => {
            spyOn(component, 'ngAfterViewChecked').and.callThrough();
            component.tabSetWidth = 1;
            component.ngAfterViewChecked();
            expect(component.ngAfterViewChecked).toHaveBeenCalled();
        });

        it('onResize should be called with tabsWidth < tabSetWidth', () => {
            spyOn(component, 'onResize').and.callThrough();

            component.level = 3;
            (component as any).tabSet = {
                links: [
                    {
                        elRef: {
                            nativeElement: { offsetWidth: 10 }
                        },
                        navItem: { id: 1 }
                    }
                ]
            };
            component.onResize();

            expect(component.onResize).toHaveBeenCalled();
        });

        it('onResize should be called with tabsWidth > tabSetWidth', () => {
            spyOn(component, 'onResize').and.callThrough();
            spyOn(component.navItems, 'toArray').and.returnValue([
                {
                    hidden: true,
                    navItemName: 'someName',
                    navItemLink: 'someLink'
                }
            ] as any);
            spyOnProperty(
                component.tabSetElementRef.nativeElement,
                'offsetWidth',
                'get'
            ).and.returnValue(0);

            component.tabSetWidth = 0;
            (component as any).tabSet = {
                links: [
                    {
                        elRef: {
                            nativeElement: { offsetWidth: 10 }
                        },
                        navItem: { id: 1 }
                    }
                ]
            };
            component.onResize();

            expect(component.onResize).toHaveBeenCalled();
        });

        it('resetItems should be called', () => {
            spyOn(component, 'resetItems').and.callThrough();
            (component as any).navItems = [{ hidden: true }];
            component.resetItems();
            expect(component.resetItems).toHaveBeenCalled();
        });

        it('selectById should call tabset select', () => {
            spyOn(component.tabSet, 'select').and.callThrough();
            component.selectById('someValue');
            expect(component.tabSet.select).toHaveBeenCalledWith('someValue');
        });

        it('onNavChange should call navChange emit', () => {
            spyOn(component.navChange, 'emit').and.callThrough();
            const val = {} as NgbNavChangeEvent;
            component.onNavChange(val);
            expect(component.navChange.emit).toHaveBeenCalledWith(val);
        });

        it('onNavItemClick should call navItem emit', () => {
            spyOn(component.navItemClick, 'emit').and.callThrough();
            const val = {} as NavItemDirective;
            component.onNavItemClick(val);
            expect(component.navItemClick.emit).toHaveBeenCalledWith(val);
        });
    });

    it('should render custom tab header template', () => {
        const hostFixture = TestBed.createComponent(HostComponent);
        hostFixture.detectChanges();
        const tab = hostFixture.debugElement.query(By.css('a'));
        expect(tab.nativeNode.textContent).toBe('Item 1 someText');
    });
});

@Directive({
    selector: '[libScrollerDisabled]',
    standalone: false
})
export class LibScrollerDisabledDir {
    @Input() libScrollerDisabled;
}

@Component({
    template: `
        <lib-nav [useHorizontalScroll]="true">
            <ng-container *ngFor="let item of [1, 2, 3]">
                <ng-template
                    navItem
                    [navItemName]="'Item ' + item"
                    [navItemId]="'tab' + item"
                >
                    Tab Content {{ item }}
                </ng-template>

                <ng-template #tabHeaderTmpl let-item
                    >{{ item.navItemName }} someText</ng-template
                >
            </ng-container>
        </lib-nav>
    `,
    standalone: false
})
class HostComponent {}
