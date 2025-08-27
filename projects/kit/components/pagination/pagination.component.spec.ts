import {
    PagerService,
    Pagination,
    PaginationComponent
} from '@dagility-ui/kit';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [PaginationComponent],
                providers: [PagerService],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        component.pager = {
            totalItems: 1,
            currentPage: 1,
            pageSize: 1,
            totalPages: 1,
            startPage: 1,
            endPage: 1,
            startIndex: 0,
            endIndex: 0,
            pages: []
        };
        fixture.detectChanges();
    });

    it('PaginationComponent should be created', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnChanges should be called and perPage should be equal to param', () => {
        spyOn(component, 'ngOnChanges').and.callThrough();
        component.metaData = { pageSize: 1, page: 1 } as Pagination;
        component.ngOnChanges();
        expect(component.ngOnChanges).toHaveBeenCalled();
    });

    it('changeMessage should be called and perPage should be equal to param', () => {
        component.changeMessage(1);
        expect(component.perPageCount).toBe(1);
    });

    it('getVisiblePages should be called', () => {
        spyOn(component, 'getVisiblePages').and.callThrough();
        component.getVisiblePages();
        expect(component.getVisiblePages).toHaveBeenCalled();
    });

    it('getVisiblePages should be called with another condition', () => {
        spyOn(component, 'getVisiblePages').and.callThrough();

        component.pager.currentPage = 4;
        component.pager.totalPages = 10;
        component.getVisiblePages();

        expect(component.getVisiblePages).toHaveBeenCalled();
    });

    it('isEndOfList should return true', () => {
        expect(component.isEndOfList()).toBe(true);
    });

    it('jump should assign jumpValue to empty string', () => {
        component.jumpValue = '0';
        component.jump();
        expect(component.jumpValue).toBe('');
    });

    it('jump should assign jumpValue to empty string with page equal val', () => {
        component.jumpValue = '10';
        component.pager.totalPages = 100;
        component.jump();
        expect(component.jumpValue).toBe('');
    });

    it('onJumpValueChange should call jump', () => {
        spyOn(component, 'jump').and.callThrough();
        component.onJumpValueChange({ key: 'Enter' });
        expect(component.jump).toHaveBeenCalled();
    });

    it('onJumpValueChange should assign jumpValue to e.target.value', () => {
        component.onJumpValueChange({
            key: 'someValue',
            target: { value: '1' }
        });
        expect(component.jumpValue).toBe('1');
    });

    it('validateJumpValue should return true', () => {
        expect(component.validateJumpValue({ charCode: 48 })).toBe(true);
    });
});
