import {
    DataGridComponent,
    NoDataRowTemplateDirective,
    Pager
} from '@dagility-ui/kit';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DataGridComponent', () => {
    @Component({
    template: `
            <lib-data-grid [dataSource]="data" [columns]="$any(columns)">
                <tr *noDataRow="let columns" data-test-id="no-data-row">
                    <td [attr.colspan]="columns.length"></td>
                </tr>
            </lib-data-grid>
        `,
    standalone: false
})
    class DataGridNoDataWrapper {
        @Input() data: unknown = [];
        columns = [{}, {}];
    }

    let component: DataGridComponent;
    let fixture: ComponentFixture<DataGridComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    DataGridComponent,
                    DataGridNoDataWrapper,
                    NoDataRowTemplateDirective
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DataGridComponent);
        component = fixture.componentInstance;
        component.columns = [
            { title: 'Header Name', width: '50%' },
            { title: 'Header Name', width: '50%' }
        ];
        component.dataSource = [
            { headerName: 'Header 1', value: 'Value' },
            { headerName: 'Header 2', value: 'Value' }
        ];
        fixture.detectChanges();
    });

    it('Data-Grid should be create', () => {
        expect(component).toBeTruthy();
    });

    it('changeSort should be called', () => {
        spyOn(component, 'changeSort').and.callThrough();
        component.changeSort(null);
        expect(component.changeSort).toHaveBeenCalledWith(null);
    });

    it('changeSort should call sort emit', () => {
        spyOn(component.sort, 'emit').and.callThrough();
        component.changeSort('someValue');
        expect(component.sort.emit).toHaveBeenCalledWith('someValue');
    });

    it('onPageChange should emit rowDoubleClick', () => {
        spyOn(component.pageChange, 'emit').and.callThrough();
        const pagerStub = {} as Pager;
        component.onPageChange(pagerStub);
        expect(component.pageChange.emit).toHaveBeenCalledWith(pagerStub);
    });

    it('handleRowClick should emit rowDoubleClick', () => {
        spyOn(component.rowClick, 'emit').and.callThrough();
        component.handleRowClick({});
        expect(component.rowClick.emit).toHaveBeenCalledWith({});
    });

    it('handleDoubleClick should emit rowDoubleClick', () => {
        spyOn(component.rowDoubleClick, 'emit').and.callThrough();
        component.handleDoubleClick({});
        expect(component.rowDoubleClick.emit).toHaveBeenCalledWith({});
    });

    it('trackByItem should be return result of trackByFn', () => {
        const val = {};
        component.trackByFn = (i, item) => {
            return { index: i, val: item };
        };

        const expectValue = component.trackByFn(0, val);
        const res = component.trackByItem(0, val);
        expect(res).toEqual(expectValue);
    });

    it('trackByItem should be return the same value', () => {
        const val = {};
        const res = component.trackByItem(0, val);

        expect(res).toBe(val);
    });

    it('itemGuard should be return the same value', () => {
        const val = {};
        const res = component.itemGuard(val);

        expect(res).toBe(val);
    });

    it(`verify no data template`, () => {
        function getNoDataRow() {
            return fixture.debugElement.query(
                By.css(`[data-test-id="no-data-row"]`)
            );
        }

        const fixture = TestBed.createComponent(DataGridNoDataWrapper);
        fixture.detectChanges();
        expect(getNoDataRow()).toBeTruthy();

        fixture.componentRef.setInput('data', [1, 2, 3]);
        fixture.detectChanges();
        expect(getNoDataRow()).toBeFalsy();
    });
});
