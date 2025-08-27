import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidenavGroupComponent } from '@dagility-ui/kit';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';

describe('SidenavGroupComponent', () => {
    let component: SidenavGroupComponent;
    let fixture: ComponentFixture<SidenavGroupComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SidenavGroupComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('SidenavGroupComponent should be create', () => {
        expect(component).toBeTruthy();
    });

    it('filteredItems should be called', () => {
        spyOnProperty(component, 'filteredItems', 'get').and.callThrough();
        component.item = { items: [] } as any;
        expect(component.filteredItems).toEqual([]);
    });

    it('handleSearch should assign value to someValue', () => {
        component.handleSearch('someValue');
        expect(component.value).toBe('someValue');
    });

    it('handleSearchClick should be called', () => {
        spyOn(component, 'handleSearchClick').and.callThrough();
        component.handleSearchClick();

        ((component as any)['subscription'] as Subject<any>).next(
            document.createElement('div')
        );

        expect(component.handleSearchClick).toHaveBeenCalled();
    });

    it('filterItems should be called', () => {
        spyOn<any>(component, 'filterItems').and.callThrough();
        (component as any).filterItems(
            [
                {
                    title: 'someTitle'
                },
                {
                    title: 'anotherTitle',
                    children: [
                        {
                            title: 'someTitle'
                        }
                    ]
                },
                {
                    title: 'anotherTitle'
                }
            ] as any,
            'someTitle'
        );
        expect((component as any).filterItems).toHaveBeenCalled();
    });

    it('filterItems should be called without subItems', () => {
        spyOn<any>(component, 'filterItems').and.callThrough();
        (component as any).filterItems(
            [
                {
                    title: 'someTitle',
                    children: []
                }
            ] as any,
            'anotherTitle'
        );
        expect((component as any).filterItems).toHaveBeenCalled();
    });

    it('ngOnDestroy should be called', () => {
        spyOn(component, 'ngOnDestroy').and.callThrough();
        component.ngOnDestroy();
        expect(component.ngOnDestroy).toHaveBeenCalled();
    });
});
